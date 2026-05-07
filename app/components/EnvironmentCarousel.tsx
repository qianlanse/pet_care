"use client";

import { useState } from "react";

const slides = [
  {
    tab: "接待区",
    label: "接待区",
    title: "浅木、暖石材和低饱和绿植组成的安静前厅",
    image: "/imagegen/reception-lounge.png",
    alt: "中国高端宠物洗护店的接待区与等候区效果图",
    copy:
      "入口区强调秩序感和柔和欢迎感，避免商场式喧闹。主人能在这里完成登记、等候和简短沟通，宠物也能先观察环境再进入护理节奏。",
    details: [
      ["材质重点", "浅橡木、米白微水泥、暖色织物坐垫"],
      ["气质表达", "像精品生活方式门店，不像普通宠物用品堆头"],
    ],
    note: "建议保留低矮展示和留白墙面，让第一眼重点落在整洁度、光线和空间呼吸感上。",
  },
  {
    tab: "洗护区",
    label: "洗护区",
    title: "半开放独立洗护位，强调洁净、明亮和专业感",
    image: "/imagegen/wash-zone.png",
    alt: "中国高端宠物洗护店的独立洗护区效果图",
    copy:
      "洗护区需要明显的卫生感和设备秩序。重点不是堆器械，而是让洗护台、收纳、排水和照明彼此协调，呈现出专业但不压迫的工作氛围。",
    details: [
      ["材质重点", "防滑地面、不锈钢洗护台、暖白灯光和整齐收纳"],
      ["气质表达", "像宠物护理工作室，不像医院处理间"],
    ],
    note: "洗护区的高端感更多来自干净的设备线条、视线整洁度和细节收纳，而不是夸张的装饰元素。",
  },
  {
    tab: "吹护区",
    label: "吹护区",
    title: "更柔和的灯光和包裹感，让吹护区看起来稳定而细腻",
    image: "/imagegen/drying-styling-zone.png",
    alt: "中国高端宠物洗护店的吹护与造型区效果图",
    copy:
      "吹护区负责长时间陪伴和细节整理，空间语言应更柔和。镜面、台面和灯带的比例要克制，让顾客感受到精细服务，而不是视觉噪音。",
    details: [
      ["材质重点", "柔雾镜面、浅胡桃木、隐藏灯带和皮质细节"],
      ["气质表达", "更接近高端沙龙的修饰区，安静但不冰冷"],
    ],
    note: "这里适合强化“被认真照顾”的感受，所以镜前光和座位、工具摆放都要更讲究层次与节奏。",
  },
];

export default function EnvironmentCarousel() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const render = (index: number) => {
    setCurrent((index + total) % total);
  };

  return (
    <div className="environment-shell" data-carousel>
      <div className="environment-toolbar">
        <div className="environment-tabs" role="tablist" aria-label="店内环境区域">
          {slides.map((slide, index) => {
            const active = index === current;
            return (
              <button
                className={`environment-tab${active ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={active}
                data-slide={index}
                key={slide.tab}
                onClick={() => render(index)}
              >
                {slide.tab}
              </button>
            );
          })}
        </div>
        <div className="environment-actions">
          <button className="carousel-button" type="button" aria-label="上一张" onClick={() => render(current - 1)}>
            ←
          </button>
          <button className="carousel-button" type="button" aria-label="下一张" onClick={() => render(current + 1)}>
            →
          </button>
        </div>
      </div>

      <div className="environment-viewport">
        <div
          className="environment-track"
          data-carousel-track
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article className={`environment-slide${index === current ? " is-active" : ""}`} key={slide.label}>
              <div className="environment-image">
                <img src={slide.image} alt={slide.alt} />
              </div>
              <div className="environment-copy">
                <div className="section-label">{slide.label}</div>
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
                <div className="environment-meta">
                  {slide.details.map(([title, detail]) => (
                    <article key={title}>
                      <strong>{title}</strong>
                      <span>{detail}</span>
                    </article>
                  ))}
                </div>
                <div className="environment-note">{slide.note}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
