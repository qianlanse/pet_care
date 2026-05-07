import BookingForm from "./components/BookingForm";
import EnvironmentCarousel from "./components/EnvironmentCarousel";
import ScrollReveal from "./components/ScrollReveal";

const services = [
  ["01", "基础洗护", "包含梳毛、洁耳、修脚底毛、温和清洁、吹干与基础整理，适合固定周期到店清洁。"],
  ["02", "精细修毛", "围绕脸部、四肢、尾部与身体轮廓做顺毛修整，保留自然感，不做过度夸张造型。"],
  ["03", "猫咪轻护", "使用更短流程和更低噪音设备，重点处理梳结、局部清洁和情绪安抚，减少长时间束缚。"],
  ["04", "附加护理", "可加购牙齿清洁、局部除结、肉垫滋润、香波升级与驱味护理，按实际毛况选择。"],
];

const processSteps = [
  ["1", "进店评估", "确认皮肤、毛结、耳道和情绪状态，记录注意事项，再决定护理节奏。"],
  ["2", "分区清洁", "先处理脚底、腹部和易脏区域，再做整体洗护，降低二次沾污和反复冲洗。"],
  ["3", "独立吹护", "根据毛量和耐受程度调节风速与距离，避免过热和持续噪音刺激。"],
  ["4", "整理交接", "完成梳顺、检查细节并向主人反馈毛况与下次建议，让后续护理更稳定。"],
];

const storyPoints = [
  ["低噪设备区", "尽量控制风机和推剪的持续噪音，缩短高压时段。"],
  ["清洁台面", "洗护台、毛巾和工具按批次整理，保持到店观感和卫生感。"],
  ["主人可沟通", "护理前后都能说明宠物状态，减少“洗完才知道”的信息落差。"],
  ["回访节奏稳定", "推荐 3-5 周的基础洗护周期，让毛发和皮肤状态更可控。"],
];

const pricing = [
  {
    label: "轻洗护",
    title: "小体型日常清洁",
    price: "¥98",
    desc: "适合 5kg 以内短毛犬和状态稳定宠物",
    items: ["基础清洁与吹干", "耳部与脚底整理", "简单梳顺与交接反馈"],
  },
  {
    label: "标准洗护",
    title: "门店常规回访主力套餐",
    price: "¥168",
    desc: "适合中小体型、长毛或需要基础修整的宠物",
    items: ["全套洗护与独立吹护", "脸部、四肢与臀部精细修整", "护理记录与周期建议"],
    featured: true,
  },
  {
    label: "舒缓护理",
    title: "猫咪或敏感型宠物轻护",
    price: "¥228",
    desc: "更适合易紧张、首次到店或护理过程需要拆分的情况",
    items: ["低刺激节奏安排", "局部除结与局部清洁", "缩短高压操作时长"],
  },
];

const reviews = [
  {
    title: "第一次来没有强行推进流程",
    copy: "“我们家狗比较怕吹风，这里会先让它熟悉一下环境，再慢慢开始，洗完情绪比以前稳定很多。”",
    name: "陈女士",
    type: "周末回访顾客",
    avatar: "陈",
    rating: "4.9",
  },
  {
    title: "洗得干净，但不是那种很刺激的香味",
    copy: "“毛顺了很多，耳朵和脚底也处理得细，回家之后抱起来是干净的，不是很冲的护理味。”",
    name: "李先生",
    type: "社区常驻顾客",
    avatar: "李",
    rating: "5.0",
  },
  {
    title: "沟通清楚，比只讲套餐更可信",
    copy: "“会提前说明毛结和需要加项的地方，没有临时加价的突兀感，做完也会告诉我下次怎么约更合适。”",
    name: "赵女士",
    type: "会员顾客",
    avatar: "赵",
    rating: "4.8",
  },
];

export default function Home() {
  return (
    <div className="shell">
      <ScrollReveal />
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">
            <div className="brand-mark">沐</div>
            <div className="brand-text">
              <small>Mu Yu Pet Grooming</small>
              <span>木屿宠物洗护</span>
            </div>
          </a>
          <nav className="nav">
            <a href="#services">服务项目</a>
            <a href="#process">护理流程</a>
            <a href="#pricing">价格套餐</a>
            <a href="#location">门店地址</a>
            <a className="nav-cta" href="#booking">
              预约洗护
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="hero-wrap">
          <section className="hero" data-animate="hero">
            <div className="hero-background" aria-hidden="true">
              <img
                src="https://images.pexels.com/photos/19145883/pexels-photo-19145883.jpeg?auto=compress&cs=tinysrgb&w=1800"
                alt=""
              />
            </div>
            <div className="hero-overlay" aria-hidden="true" />

            <div className="hero-content">
              <div className="hero-copy">
                <div className="eyebrow">温和清洁 / 独立吹护 / 安静环境</div>
                <h1>把每一次洗护，做成宠物愿意再来的安心体验。</h1>
                <p>
                  木屿宠物洗护专注猫狗基础清洁、精细修毛与日常护理。我们把节奏放慢，把流程做细，让敏感、初次洗护和高频护理的宠物都能在稳定环境里完成舒适洗护。
                </p>
                <div className="hero-actions">
                  <a href="#booking">预约洗护</a>
                  <a href="#services">查看服务</a>
                </div>
                <div className="hero-meta">
                  <article>
                    <strong>40-90 分钟</strong>
                    <span>按体型与毛量分配护理时长，避免赶工。</span>
                  </article>
                  <article>
                    <strong>一宠一消毒</strong>
                    <span>接触工具与台面单次清洁，减少交叉刺激。</span>
                  </article>
                  <article>
                    <strong>可记录习惯</strong>
                    <span>记下怕风、怕水、偏好姿势，方便下次护理。</span>
                  </article>
                </div>
              </div>

              <div className="hero-booking">
                <BookingForm />
                <div className="hero-badge">
                  <strong>低刺激洗护</strong>
                  <span>按照肤况与毛发状态选择清洁方案</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section id="services" data-animate="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-label">服务项目</div>
                <h2>围绕真实门店需求设计的日常洗护服务</h2>
                <p>服务结构保持克制，重点是基础清洁、毛发整理和主人最常反复购买的高频护理项目。</p>
              </div>
              <div className="section-side">
                小体型和中大型宠物都可预约。对于胆小、第一次来店或有旧伤敏感部位的宠物，会先做沟通和状态判断，再进入正式洗护。
              </div>
            </div>

            <div className="service-grid">
              {services.map(([index, title, copy]) => (
                <article key={index} data-animate="card">
                  <div className="service-index">{index}</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process" id="process" data-animate="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-label">护理流程</div>
                <h2>让宠物不慌，流程就不能急</h2>
                <p>护理流程会先观察状态，再进入清洁和吹护。把顺序做对，宠物的配合度通常比单纯追求速度更重要。</p>
              </div>
              <div className="section-side">对容易紧张的宠物，会在进店后先给几分钟适应时间，必要时拆分操作，先做能接受的环节。</div>
            </div>

            <div className="process-list">
              {processSteps.map(([index, title, copy]) => (
                <article key={index} data-animate="card">
                  <div className="process-step">{index}</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-animate="section">
          <div className="section-inner">
            <div className="story-layout">
              <div className="story-copy">
                <div className="section-label">门店氛围</div>
                <h2>一间让主人放心等、让宠物慢慢适应的洗护小店</h2>
                <p>
                  空间不追求复杂陈列，重点是干净、安静、好通风。洗护区、等候区和用品区分开，让到店节奏更清楚，也减少陌生声音和频繁打扰。
                </p>
                <div className="story-points">
                  {storyPoints.map(([title, copy]) => (
                    <article key={title}>
                      <strong>{title}</strong>
                      <span>{copy}</span>
                    </article>
                  ))}
                </div>
              </div>
              <div className="story-visual">
                <img
                  src="https://images.pexels.com/photos/6816862/pexels-photo-6816862.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="宠物美容护理中的狗狗特写"
                />
                <div className="story-overlay">
                  <strong>护理记录会留下来</strong>
                  <p>下次来店时可以沿用上一次适合的香波、吹护节奏和修毛偏好。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="environment-section" id="environment" data-animate="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-label">店内环境</div>
                <h2>三个区域，分别承担接待、洗护和吹护的情绪管理</h2>
                <p>高端宠物洗护店的环境重点不是堆装饰，而是让不同环节有明确气质和功能边界。这里用轮播展示门店的三个核心区域。</p>
              </div>
              <div className="section-side">
                当前运行环境没有可用的 AI 出图密钥，所以这里先接入轮播结构与本地图片路径。生成提示词已经准备好，补上密钥后可以直接替换成 AI 图。
              </div>
            </div>

            <EnvironmentCarousel />
          </div>
        </section>

        <section id="pricing" data-animate="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-label">价格套餐</div>
                <h2>把价格说清楚，让回访更轻松</h2>
                <p>价格按照体型、毛量和护理复杂度做基础区分。下列为常规区间，特殊毛结和额外护理会在开始前先确认。</p>
              </div>
              <div className="section-side">如果门店主打社区复购，套餐不宜过多。保留 2-3 个清晰档位，比堆很多营销名词更有效。</div>
            </div>

            <div className="pricing-grid">
              {pricing.map((item) => (
                <article className={`pricing-card${item.featured ? " featured" : ""}`} key={item.title} data-animate="card">
                  <div className="section-label">{item.label}</div>
                  <h3>{item.title}</h3>
                  <strong>{item.price}</strong>
                  <span>{item.desc}</span>
                  <ul>
                    {item.items.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-animate="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-label">到店反馈</div>
                <h2>真实门店最重要的是复购感受</h2>
                <p>顾客不一定记得所有护理名词，但会记得宠物回来后有没有舒服、有没有抗拒、有没有被认真对待。</p>
              </div>
              <div className="section-side">以下文案适合做门店落地页展示，也方便后续替换成真实评价截图或社媒内容。</div>
            </div>

            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review" key={review.title} data-animate="card">
                  <div className="review-topline">
                    <div className="review-person">
                      <div className="review-avatar" aria-hidden="true">
                        {review.avatar}
                      </div>
                      <div>
                        <strong>{review.name}</strong>
                        <small>{review.type}</small>
                      </div>
                    </div>
                    <div className="review-rating" aria-label={`${review.rating} 分评价`}>
                      <span>★★★★★</span>
                      <strong>{review.rating}</strong>
                    </div>
                  </div>
                  <h3>{review.title}</h3>
                  <p>{review.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="location-section" id="location" data-animate="section">
          <div className="location-map-background" aria-hidden="true">
            <img src="/imagegen/store-location-map.png" alt="" />
          </div>
          <div className="location-overlay" aria-hidden="true" />

          <div className="location-content">
            <div className="location-copy">
              <div className="section-label">门店地址</div>
              <h2>陕西北路 1620 号，宜川路街道里的安心洗护点</h2>
              <div className="pet-map-caption">
                红色爪印为木屿宠物洗护
                <span>上海市宜川路街道陕西北路 1620 号</span>
              </div>
              <div className="location-address">
                <strong>到店导航地址</strong>
                <p>上海市宜川路街道陕西北路 1620 号</p>
              </div>
              <div className="location-tips">
                <article>
                  <strong>附近参照</strong>
                  <span>靠近宜川路与陕西北路路口，地图上红色爪印标记即为门店。</span>
                </article>
                <article>
                  <strong>预约建议</strong>
                  <span>带猫狗到店建议预留 10 分钟适应时间，周末请提前 1-2 天预约。</span>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-grid">
            <article className="footer-card">
              <div className="section-label">到店须知</div>
              <h3>把情况提前说清楚，洗护会顺很多</h3>
              <p>如宠物近期打疫苗、皮肤状态不稳定、存在严重打结或有咬剪情况，请预约时提前备注，便于安排时间与护理方式。</p>
              <div className="meta">
                首次到店建议提早 10 分钟
                <br />
                可带常用牵引绳或熟悉的小零食
              </div>
            </article>
          </div>
          <div className="copyright">© 2026 木屿宠物洗护. 单页面门店落地页示例。</div>
        </div>
      </footer>
    </div>
  );
}
