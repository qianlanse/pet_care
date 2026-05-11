import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

const petTypes = new Set(["小型犬", "中大型犬", "猫咪", "其他宠物"]);
const serviceItems = new Set(["基础洗护", "精细修毛", "猫咪轻护", "附加护理"]);
const phonePattern = /^[0-9+() -]{6,32}$/;
const arrivalPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

let pool: Pool | undefined;

type BookingPayload = {
  contactName?: unknown;
  phone?: unknown;
  arrivalTime?: unknown;
  petType?: unknown;
  serviceItem?: unknown;
  note?: unknown;
};

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.POSTGRES_SESSION_POOL_URL;

  if (!connectionString) {
    throw new Error("Missing POSTGRES_SESSION_POOL_URL");
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

  return pool;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeArrivalTime(value: string) {
  if (!arrivalPattern.test(value)) {
    return "";
  }

  return `${value}:00+08:00`;
}

function parseBookingPayload(payload: BookingPayload) {
  const contactName = text(payload.contactName);
  const phone = text(payload.phone);
  const arrivalTime = normalizeArrivalTime(text(payload.arrivalTime));
  const petType = text(payload.petType);
  const serviceItem = text(payload.serviceItem);
  const note = text(payload.note);

  if (
    !contactName ||
    contactName.length > 80 ||
    !phonePattern.test(phone) ||
    !arrivalTime ||
    !petTypes.has(petType) ||
    !serviceItems.has(serviceItem) ||
    note.length > 1000
  ) {
    return null;
  }

  return {
    contactName,
    phone,
    arrivalTime,
    petType,
    serviceItem,
    note: note || null,
  };
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "预约信息格式不正确" }, { status: 400 });
  }

  const booking = parseBookingPayload(payload);

  if (!booking) {
    return NextResponse.json({ message: "请检查预约信息后再提交" }, { status: 400 });
  }

  try {
    await getPool().query(
      `insert into public.appointments (
        contact_name,
        phone,
        arrival_time,
        pet_type,
        service_item,
        note
      )
      values ($1, $2, $3, $4, $5, $6)
      `,
      [
        booking.contactName,
        booking.phone,
        booking.arrivalTime,
        booking.petType,
        booking.serviceItem,
        booking.note,
      ],
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to create appointment", error);
    return NextResponse.json({ message: "预约提交失败，请稍后再试" }, { status: 500 });
  }
}
