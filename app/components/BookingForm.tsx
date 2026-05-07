"use client";

import { FormEvent, useState } from "react";

const petTypes = ["小型犬", "中大型犬", "猫咪", "其他宠物"];
const serviceItems = ["基础洗护", "精细修毛", "猫咪轻护", "附加护理"];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="booking-form" id="booking" onSubmit={onSubmit}>
      <div className="booking-form-head">
        <span>预约洗护</span>
        <h2>留下到店信息</h2>
        <p>提交后我们会按期望时间联系确认，优先安排安静护理时段。</p>
      </div>

      <div className="booking-grid">
        <label>
          <span>联系人</span>
          <input name="contactName" type="text" placeholder="例如：陈女士" required />
        </label>
        <label>
          <span>手机号</span>
          <input name="phone" type="tel" placeholder="用于确认预约" required />
        </label>
      </div>

      <label>
        <span>期望到店时间</span>
        <input name="arrivalTime" type="datetime-local" required />
      </label>

      <div className="booking-grid">
        <label>
          <span>宠物类型</span>
          <select name="petType" defaultValue="" required>
            <option value="" disabled>
              请选择
            </option>
            {petTypes.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>服务项目</span>
          <select name="serviceItem" defaultValue="" required>
            <option value="" disabled>
              请选择
            </option>
            {serviceItems.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>备注</span>
        <textarea name="note" rows={3} placeholder="可填写体重、毛量、怕水怕风、皮肤状态等" />
      </label>

      <button type="submit">提交预约信息</button>

      {submitted ? (
        <p className="booking-success" role="status">
          预约已收到，我们会尽快联系你确认具体到店时间。
        </p>
      ) : null}
    </form>
  );
}
