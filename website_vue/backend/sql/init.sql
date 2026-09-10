-- 通用公司网站数据库初始化脚本
-- 数据库: website_vue_node
-- 本脚本幂等: 每次执行前清空业务表, 管理员/配置保留最新

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ========================================================
-- 建表
-- ========================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(50),
  avatar VARCHAR(255),
  role VARCHAR(20) DEFAULT 'editor',
  status TINYINT DEFAULT 1 COMMENT '0禁用 1启用',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  `key` VARCHAR(50) NOT NULL UNIQUE,
  `value` TEXT,
  description VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS banners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  image VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1 COMMENT '0隐藏 1显示',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS company_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT,
  type VARCHAR(50) DEFAULT 'about' COMMENT 'about/culture/history/honors',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  detail LONGTEXT,
  image VARCHAR(255),
  price DECIMAL(10,2),
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1 COMMENT '0下架 1上架',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS news_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  content LONGTEXT,
  cover_image VARCHAR(255),
  views INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1 COMMENT '0草稿 1发布',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES news_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  location VARCHAR(100),
  salary VARCHAR(100),
  requirements TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1 COMMENT '0关闭 1招聘中',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(100),
  content TEXT NOT NULL,
  reply TEXT,
  status TINYINT DEFAULT 0 COMMENT '0未回复 1已回复',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  url VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- 清空业务表 (幂等, 保留管理员与配置)
-- ========================================================
TRUNCATE TABLE banners;
TRUNCATE TABLE company_profiles;
TRUNCATE TABLE products;
TRUNCATE TABLE product_categories;
TRUNCATE TABLE news;
TRUNCATE TABLE news_categories;
TRUNCATE TABLE jobs;
TRUNCATE TABLE links;
-- messages 保留用户提交的真实留言, 不清空

SET FOREIGN_KEY_CHECKS = 1;

-- ========================================================
-- 管理员 (密码: admin123)
-- ========================================================
INSERT INTO admin_users (username, password, nickname, role, status) VALUES
('admin', '$2a$10$XaSt2UN0cdbthdBR.Z5XZuk73iQHRdV/ZHYDT7mIqSkVBMelkSuKS', '超级管理员', 'admin', 1)
ON DUPLICATE KEY UPDATE password = VALUES(password), nickname = VALUES(nickname);

-- ========================================================
-- 网站配置 (演示公司: 云启科技)
-- ========================================================
INSERT INTO site_settings (`key`, `value`, `description`) VALUES
('site_name', '云启科技有限公司', '网站名称'),
('site_logo', '', '网站Logo'),
('site_icon', 'fa-microchip', '站点图标(Font Awesome类名)'),
('site_icp', '沪ICP备20260001号', '备案号'),
('seo_title', '云启科技-企业数字化与智能软件解决方案', 'SEO标题'),
('seo_keywords', '数字化转型,企业软件,云计算,智能制造,系统集成', 'SEO关键词'),
('seo_description', '云启科技专注企业数字化与智能化建设，提供软件研发、云平台与系统集成服务，助力传统产业提效升级。', 'SEO描述'),
('contact_phone', '400-800-6688', '联系电话'),
('contact_email', 'contact@yunqitech.com', '联系邮箱'),
('contact_address', '上海市浦东新区张江高科技园区科苑路88号', '公司地址'),
('site_theme', 'default', '前台风格模版'),
('home_badge', 'YUNQI TECH', '首页轮播角标'),
('home_slogan', '企业数字化 · 智能软件 · 系统集成一站式服务', '首页轮播副标题'),
('home_about_image', 'uploads/体育用品公司图片素材 (1).jpg', '首页关于我们配图'),
('home_experience_num', '10+', '首页经验数字'),
('home_experience_label', '年行业经验', '首页经验文案'),
('home_products_title', '热门产品', '首页产品区标题'),
('home_products_desc', '精选核心产品与解决方案，覆盖企业管理、云平台与智能制造场景', '首页产品区描述'),
('home_cta_title', '开启你的数字化之旅', '首页底部CTA标题'),
('home_cta_desc', '无论你是制造企业还是成长型公司，我们都为你准备了可落地的数字化解决方案。', '首页底部CTA描述'),
('feature_1_icon', 'fa-shield-halved', '特色1图标'),
('feature_1_title', '品质交付', '特色1标题'),
('feature_1_desc', '规范实施流程与质量体系，保障项目按时高质量上线。', '特色1描述'),
('feature_2_icon', 'fa-cloud', '特色2图标'),
('feature_2_title', '云端能力', '特色2标题'),
('feature_2_desc', '支持公有云、私有云与混合云部署，数据安全可控。', '特色2描述'),
('feature_3_icon', 'fa-headset', '特色3图标'),
('feature_3_title', '专业服务', '特色3标题'),
('feature_3_desc', '售前咨询到售后运维全程陪伴，响应及时、方案可落地。', '特色3描述'),
('feature_4_icon', 'fa-arrows-rotate', '特色4图标'),
('feature_4_title', '持续演进', '特色4标题'),
('feature_4_desc', '产品持续迭代升级，与业务一起成长，降低长期总成本。', '特色4描述'),
('stat_1_num', '10+', '统计1数字'),
('stat_1_label', '行业深耕年数', '统计1标签'),
('stat_1_icon', 'fa-medal', '统计1图标'),
('stat_2_num', '200+', '统计2数字'),
('stat_2_label', '服务企业客户', '统计2标签'),
('stat_2_icon', 'fa-handshake', '统计2图标'),
('stat_3_num', '500+', '统计3数字'),
('stat_3_label', '成功交付项目', '统计3标签'),
('stat_3_icon', 'fa-users', '统计3图标'),
('stat_4_num', '98%', '统计4数字'),
('stat_4_label', '客户满意度', '统计4标签'),
('stat_4_icon', 'fa-star', '统计4图标'),
('about_hero_title', '关于 云启科技', '关于页英雄区标题'),
('about_hero_desc', '专注企业数字化与智能化建设，以技术驱动产业升级，为企业客户提供软件研发、云平台与系统集成一站式服务。', '关于页英雄区描述'),
('about_cta_title', '与我们一起，开启数字化之旅', '关于页底部CTA标题'),
('about_cta_desc', '欢迎洽谈合作，或浏览我们的产品与解决方案了解更多', '关于页底部CTA描述'),
('about_cover_1', 'uploads/体育用品公司图片素材 (1).jpg', '关于页配图1'),
('about_cover_2', 'uploads/体育用品公司图片素材 (2).jpg', '关于页配图2'),
('about_cover_3', 'uploads/体育用品公司图片素材 (3).png', '关于页配图3'),
('products_hero_title', '产品中心', '产品页英雄区标题'),
('products_hero_desc', '覆盖企业软件、云平台服务、智能制造与系统集成，助力企业数字化升级。', '产品页英雄区描述'),
('news_hero_title', '新闻资讯', '新闻页英雄区标题'),
('news_hero_desc', '公司动态、行业资讯、产品新闻，了解数字化与智能制造最新动态', '新闻页英雄区描述'),
('jobs_hero_title', '加入我们 · 共创未来', '招聘页英雄区标题'),
('jobs_hero_desc', '我们提供有竞争力的薪酬福利与专业成长平台，欢迎热爱技术、追求卓越的你。', '招聘页英雄区描述'),
('contact_hero_title', '联系我们', '联系页英雄区标题'),
('contact_hero_desc', '产品咨询、项目合作、商务洽谈，欢迎通过以下方式联系我们。', '联系页英雄区描述')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), description = VALUES(description);

-- ========================================================
-- 轮播图
-- ========================================================
INSERT INTO banners (title, image, link, sort_order, status) VALUES
('数字化升级 · 企业软件与云平台一站交付', 'uploads/轮播图素材 (1).png', '/products', 1, 1),
('智能制造 · 数据驱动产线提效', 'uploads/轮播图素材 (2).png', '/products', 2, 1),
('可靠交付 · 全程服务保障', 'uploads/轮播图素材 (3).png', '/about', 3, 1);

-- ========================================================
-- 公司信息
-- ========================================================
INSERT INTO company_profiles (title, content, type, sort_order) VALUES
('关于我们',
'<p>云启科技有限公司成立于 2015 年，是一家专注于企业数字化与智能化建设的高新技术企业。公司总部位于上海浦东张江高科技园区，拥有专业的研发团队、完善的交付体系和覆盖全国的服务网络。</p><p>我们的业务涵盖企业软件研发、云平台建设、系统集成、数据中台与智能制造解决方案等多个方向，已为制造、零售、教育、政务等行业的数百家客户提供数字化升级服务。</p><p>秉承"用技术驱动产业升级"的使命，我们始终将产品品质与客户价值放在首位，致力于成为值得信赖的数字化伙伴。</p>',
'about', 1),
('企业文化',
'<p>公司秉承 <strong>"技术创造价值"</strong> 的理念，致力于用数字化手段帮助企业降本增效、创新增长。</p><p><strong>核心价值观：</strong>客户成功 · 技术驱动 · 开放协作 · 持续进化</p><p><strong>使命：</strong>以软件与智能技术赋能千行百业</p><p><strong>愿景：</strong>成为中国领先的企业数字化解决方案服务商</p>',
'culture', 2),
('发展历程',
'<p><strong>2015 年</strong> - 公司在上海成立，起步企业定制软件开发</p><p><strong>2017 年</strong> - 推出第一代 SaaS 管理平台，服务中小企业数字化办公</p><p><strong>2019 年</strong> - 成立智能制造事业部，拓展工业互联网业务</p><p><strong>2021 年</strong> - 通过 ISO27001 信息安全管理体系认证，服务客户突破 200 家</p><p><strong>2023 年</strong> - 发布云启数据中台产品，覆盖华东、华南重点城市</p><p><strong>2025 年</strong> - 启动全国渠道合作计划，打造生态伙伴体系</p><p><strong>2026 年</strong> - 持续深耕行业解决方案，服务制造与零售标杆客户</p>',
'history', 3),
('荣誉资质',
'<p>多年发展中，云启科技获得了行业与客户的广泛认可：</p><p>✓ 国家高新技术企业</p><p>✓ ISO 9001 质量管理体系认证</p><p>✓ ISO 27001 信息安全管理体系认证</p><p>✓ 多项软件著作权与发明专利</p><p>✓ 上海市"专精特新"中小企业</p><p>✓ 连续多年"优秀数字化服务商"荣誉</p>',
'honors', 4);

-- ========================================================
-- 产品分类
-- ========================================================
INSERT INTO product_categories (id, name, sort_order, status) VALUES
(1, '企业软件', 1, 1),
(2, '云平台服务', 2, 1),
(3, '智能制造', 3, 1),
(4, '系统集成', 4, 1);

-- ========================================================
-- 产品 (图片路径沿用 uploads/ 现有素材，便于演示)
-- ========================================================
INSERT INTO products (category_id, name, description, detail, image, price, sort_order, status) VALUES
-- 企业软件 (1)
(1, '云启 ERP 企业管理套件', '财务、进销存、人资一体化，中小企业首选', '<p>覆盖采购、销售、库存、财务与人事核心模块。</p><p>支持多组织、多仓库与权限分级管理。</p><p>可按行业模板快速上线，降低实施成本。</p>', 'uploads/产品素材-标准7号成人比赛篮球.jpg', 19800.00, 1, 1),
(1, '云启 CRM 客户关系管理', '线索到成交全流程数字化', '<p>线索分配、商机跟进、合同回款一站管理。</p><p>内置销售漏斗与团队绩效看板。</p><p>支持企微/钉钉消息提醒与移动端。</p>', 'uploads/产品素材-篮球7号CBA比赛.jpg', 12800.00, 2, 1),
(1, '云启 OA 协同办公平台', '审批流、文档与会议高效协同', '<p>可视化流程设计，适配复杂审批场景。</p><p>统一待办中心，跨部门协作更顺畅。</p><p>文档在线预览与权限管控。</p>', 'uploads/产品素材-篮球7号成人.jpg', 8800.00, 3, 1),
(1, '云启 HR 人力资源系统', '招聘、考勤、薪酬一体化', '<p>支持组织架构、岗位编制与电子合同。</p><p>考勤排班与薪酬核算可配置规则。</p><p>员工自助门户提升人事效率。</p>', 'uploads/产品素材-儿童篮球小学生.jpg', 9600.00, 4, 1),
(1, '云启低代码开发平台', '业务人员可配置，IT 快速交付', '<p>拖拽式表单、流程与页面设计。</p><p>开放 API 与插件机制，易扩展。</p><p>适合内部管理系统快速迭代。</p>', 'uploads/产品素材-成人比赛标准用球.jpg', 25800.00, 5, 1),
(1, '云启项目管理系统', '研发与交付项目全生命周期管理', '<p>需求、任务、缺陷与里程碑统一跟踪。</p><p>工时统计与项目成本可视化。</p><p>支持敏捷与瀑布混合管理模式。</p>', 'uploads/产品素材-比赛用球成人足球5号.jpg', 11800.00, 6, 1),
(1, '云启知识库系统', '企业知识沉淀与检索', '<p>文档分类、版本管理与全文检索。</p><p>支持权限隔离与外部协作分享。</p><p>助力新人培训与经验复用。</p>', 'uploads/产品素材-尤尼克斯羽毛球.jpg', 6800.00, 7, 1),
(1, '云启合同管理系统', '电子签约与履约风险可控', '<p>合同模板、审批、归档一体化。</p><p>到期提醒与履约节点跟踪。</p><p>对接电子签章服务商。</p>', 'uploads/产品素材-匹克乒乓球拍正品.jpg', 7800.00, 8, 1),
(1, '云启数据分析看板', '业务指标实时可视化', '<p>拖拽式报表与大屏组件。</p><p>对接多数据源，支持定时同步。</p><p>面向管理层一屏掌握经营态势。</p>', 'uploads/产品素材-五星级乒乓球拍.jpg', 15800.00, 9, 1),
(1, '云启客服工单系统', '售前售后服务闭环管理', '<p>多渠道工单接入与智能分派。</p><p>SLA 时效监控与满意度回访。</p><p>知识库联动提升一次解决率。</p>', 'uploads/产品素材-初学者网球拍.jpg', 7200.00, 10, 1),
(1, '云启供应商协同门户', '采购协同与对账提效', '<p>询报价、订单、送货与对账在线协同。</p><p>供应商绩效评估可量化。</p><p>降低沟通成本与账期风险。</p>', 'uploads/产品素材-匹克网球拍正品.jpg', 13800.00, 11, 1),

-- 云平台服务 (2)
(2, '云启私有云部署方案', '本地化部署，数据自主可控', '<p>面向政企与制造客户的私有化交付。</p><p>含高可用架构设计与运维培训。</p><p>支持国产化软硬件适配。</p>', 'uploads/产品素材-四轮健腹轮自动回弹.jpg', 68000.00, 12, 1),
(2, '云启混合云托管服务', '公有云+专属资源灵活组合', '<p>按业务峰值弹性扩容，成本可控。</p><p>7×24 监控告警与故障响应。</p><p>统一运维门户查看资源与账单。</p>', 'uploads/产品素材-健腹轮腹肌训练器.jpg', 36000.00, 13, 1),
(2, '云启数据中台 3.0', '统一指标与数据资产治理', '<p>数据采集、清洗、建模与服务化。</p><p>指标口径统一，减少报表打架。</p><p>支持实时与离线双链路。</p>', 'uploads/产品素材-臂力器男家用训练胸肌.jpg', 128000.00, 14, 1),
(2, '云启 DevOps 交付平台', '持续集成与自动化发布', '<p>代码构建、测试、发布流水线可视化。</p><p>环境隔离与回滚策略可配置。</p><p>提升研发交付效率与质量。</p>', 'uploads/产品素材-握力器机械计数.jpg', 42000.00, 15, 1),
(2, '云启安全合规套件', '等保加固与安全运营', '<p>漏洞扫描、日志审计与权限治理。</p><p>协助等保测评与整改闭环。</p><p>适合金融、医疗等高合规场景。</p>', 'uploads/产品素材-跳绳健身.jpg', 56000.00, 16, 1),
(2, '云启 API 开放平台', '内外系统互联互通', '<p>统一网关鉴权、限流与监控。</p><p>开发者门户与文档一站发布。</p><p>快速对接伙伴与生态应用。</p>', 'uploads/产品素材-力非拉力圈田径腿部.jpg', 28000.00, 17, 1),
(2, '云启备份容灾服务', '业务连续性保障', '<p>定时备份、异地容灾与演练支持。</p><p>RPO/RTO 可按等级定制。</p><p>关键业务中断风险显著降低。</p>', 'uploads/产品素材-跨栏架障碍栏.jpg', 32000.00, 18, 1),

-- 智能制造 (3)
(3, '云启 MES 生产执行系统', '车间计划、报工与追溯一体化', '<p>工单下达、工序报工与质量采集。</p><p>批次追溯与不良分析可视化。</p><p>对接 ERP/PLM 形成闭环。</p>', 'uploads/产品素材-运动背心速干男士.jpg', 98000.00, 19, 1),
(3, '云启设备物联采集平台', '设备联网与实时监控', '<p>多协议适配，快速接入产线设备。</p><p>工况监测、能耗分析与告警推送。</p><p>为预测性维护提供数据基础。</p>', 'uploads/产品素材-运动裤子男卫裤.jpg', 76000.00, 20, 1),
(3, '云启智能仓储 WMS', '仓储作业数字化提效', '<p>入库、拣选、盘点与波次策略优化。</p><p>支持条码/RFID 与 AGV 对接。</p><p>库存准确率与发货时效提升。</p>', 'uploads/产品素材-运动裤男.jpg', 86000.00, 21, 1),
(3, '云启质量 SPC 分析系统', '过程质量统计与预警', '<p>关键质量特性实时监控。</p><p>控制图与异常自动预警。</p><p>助力精益生产与持续改进。</p>', 'uploads/产品素材-李宁足球鞋.jpg', 54000.00, 22, 1),
(3, '云启产线可视化大屏', '工厂运营一屏掌控', '<p>产能、良率、设备 OEE 实时展示。</p><p>支持多车间、多产线切换。</p><p>适用于参观接待与管理决策。</p>', 'uploads/产品素材-限量情侣刀锋鞋.jpg', 38000.00, 23, 1),

-- 系统集成 (4)
(4, '云启行业解决方案集成包', '制造/零售/政务场景化交付', '<p>按行业沉淀最佳实践与实施模板。</p><p>含咨询、实施、培训与运维。</p><p>缩短从立项到上线的周期。</p>', 'uploads/产品素材-旅行者运动包.jpg', 158000.00, 24, 1);

-- ========================================================
-- 新闻分类
-- ========================================================
INSERT INTO news_categories (id, name, sort_order, status) VALUES
(1, '公司动态', 1, 1),
(2, '行业资讯', 2, 1),
(3, '产品新闻', 3, 1);

-- ========================================================
-- 新闻资讯
-- ========================================================
INSERT INTO news (category_id, title, summary, content, cover_image, views, sort_order, status) VALUES
(1, '云启科技 2026 年数字化产品发布会在沪圆满举行',
'公司年度产品发布会于 2026 年 3 月在上海举行，发布多款企业数字化与智能制造新品。',
'<p>2026 年 3 月，云启科技有限公司在上海张江举办年度数字化产品发布会。现场发布了云启数据中台 3.0、智能制造协同平台、企业低代码开发套件等核心产品。</p><p>公司总经理在致辞中表示："云启始终坚持以客户价值为本，持续加大研发投入。2026 年我们将把智能化、平台化、行业化作为三大方向，为企业客户提供更高效的数字化体验。"</p><p>发布会吸引了近 300 位合作伙伴与媒体代表参加，多款产品现场达成意向合作。</p>',
'uploads/资讯图片素材 (1).jpg', 328, 1, 1),

(1, '云启科技签约成为某制造集团数字化转型战略合作伙伴',
'公司正式与某区域制造集团签署战略合作协议，共同推进智能工厂建设。',
'<p>云启科技近日与某区域制造集团正式签约，成为其数字化转型战略合作伙伴。</p><p>本次合作涵盖生产执行系统（MES）、设备物联采集、数据可视化大屏与供应链协同等模块，计划分三期落地。</p><p>此次合作将进一步提升云启在智能制造领域的服务能力与品牌影响力，也标志着公司行业解决方案获得头部制造企业认可。</p>',
'uploads/资讯图片素材 (2).png', 256, 2, 1),

(1, '云启华南交付中心正式启用，响应时效提升 50%',
'华南交付中心于深圳落成启用，将为华南客户提供更快的实施与运维支持。',
'<p>云启科技华南交付中心日前在深圳正式启用，集售前支持、实施交付与运维响应于一体。</p><p>中心启用后，广东、广西、福建、海南等地区客户的需求响应与驻场支持时效显著提升，核心客户可实现工作日快速上门服务。</p><p>此举也是公司完善全国服务网络、提升交付质量的重要一步。</p>',
'uploads/资讯图片素材 (3).png', 198, 3, 1),

(2, '中国企业数字化转型市场规模持续扩大',
'据行业报告显示，国内企业数字化相关投入保持两位数增长，智能制造与数据中台需求旺盛。',
'<p>最新行业报告显示，中国企业数字化转型相关市场规模持续扩大，同比增长超过两位数。</p><p>报告指出，在产业升级与降本增效驱动下，制造、零售、政务等行业对云平台、数据中台、低代码与智能制造解决方案的需求明显增强。</p><p>云启科技作为企业数字化解决方案服务商，将持续深耕行业场景，助力更多企业完成数字化升级。</p>',
'uploads/资讯图片素材 (1).png', 189, 4, 1),

(2, '工信部推动制造业数字化转型深化',
'政策持续加码，智能工厂与工业软件成为重点方向。',
'<p>相关部门持续推动制造业数字化转型，鼓励企业加大工业软件、工业互联网平台与智能装备投入。</p><p>规划强调以场景牵引、以数据赋能，加快中小企业上云用数赋智。</p><p>云启科技将积极响应政策导向，为制造客户提供可落地的数字化解决方案。</p>',
'uploads/资讯图片素材 (2).jpeg', 167, 5, 1),

(3, '新品速递：云启数据中台 3.0 正式发布',
'统一指标口径，支持实时与离线双链路，面向经营决策场景。',
'<p>云启科技全新数据中台 3.0 正式发布。产品强化指标治理、数据服务化与实时分析能力。</p><p>配合可视化看板与开放 API，可快速支撑经营分析、供应链协同与产线监控等场景。</p><p>目前已面向制造与零售标杆客户开放试用与实施咨询。</p>',
'uploads/资讯图片素材 (1).jpeg', 412, 6, 1),

(3, '产品解读：云启低代码平台如何缩短交付周期',
'业务可配置 + IT 可扩展，典型内部系统交付周期显著缩短。',
'<p>本周我们对云启低代码开发平台进行了场景化解读，覆盖表单、流程、权限与集成能力。</p><p>在内部管理系统建设中，平台可通过可视化配置减少重复编码，并保留插件与 API 扩展能力。</p><p>详细方案资料可联系售前团队获取。</p>',
'uploads/资讯图片素材 (2).png', 301, 7, 1);

-- ========================================================
-- 招聘信息
-- ========================================================
INSERT INTO jobs (title, department, location, salary, requirements, description, sort_order, status) VALUES
('售前解决方案工程师', '售前部', '上海', '15K-25K',
'1. 本科及以上学历, 3 年以上企业软件/数字化售前经验<br>2. 熟悉 ERP/MES/数据中台等至少一类产品<br>3. 具备方案撰写与客户汇报能力<br>4. 有制造或零售行业经验优先',
'负责客户需求调研、方案设计与投标支持，协同销售推进项目落地。',
1, 1),
('产品经理 (企业软件方向)', '产品部', '上海', '18K-30K',
'1. 本科及以上学历, 3 年以上 B 端产品经验<br>2. 了解企业数字化与 SaaS 产品方法论<br>3. 具备需求分析、原型设计与版本规划能力<br>4. 有制造业或供应链场景经验优先',
'负责企业软件产品线规划、需求优先级管理及版本迭代，与研发、交付多团队协同。',
2, 1),
('前端开发工程师', '技术部', '上海', '15K-25K',
'1. 熟练掌握 Vue/React 等前端框架<br>2. 熟悉前后端分离开发模式<br>3. 具备良好的团队协作能力<br>4. 有中后台或可视化大屏经验优先',
'负责公司官网、管理后台及产品前端的开发与维护，参与需求评审与方案设计。',
3, 1),
('UI 设计师', '设计部', '上海', '12K-18K',
'1. 设计相关专业本科及以上<br>2. 3 年以上 ToB 产品或官网设计经验<br>3. 精通 Figma、Photoshop 等工具<br>4. 有科技品牌视觉经验优先',
'负责产品界面、官网与市场物料视觉设计，沉淀组件规范与设计体系。',
4, 1),
('大客户销售经理', '销售部', '上海', '15K-30K + 提成',
'1. 本科及以上学历, 5 年以上 B 端销售经验<br>2. 有制造、零售或政企客户资源优先<br>3. 强沟通、强谈判、强执行力<br>4. 能适应出差',
'负责华东区域大客户开发与维护，推动数字化项目签约与续费目标达成。',
5, 1),
('实施交付经理', '交付部', '深圳', '14K-22K',
'1. 本科及以上学历, 3 年以上软件实施/项目管理经验<br>2. 熟悉需求调研、上线切换与培训交付<br>3. 具备跨团队协调与风险管理能力<br>4. 有 PMP 或同类证书优先',
'负责华南区域项目实施计划、资源协调与验收交付，保障客户上线成功。',
6, 1),
('市场运营专员', '市场部', '杭州', '9K-15K',
'1. 本科及以上学历, 1 年以上 ToB 市场运营经验<br>2. 熟悉内容营销、活动策划与线索转化<br>3. 具备文案撰写与数据分析能力<br>4. 了解数字化/工业软件赛道优先',
'负责品牌内容、线上活动与线索运营，提升品牌曝光与获客转化。',
7, 1),
('Java 后端开发工程师', '技术部', '上海', '18K-30K',
'1. 本科及以上学历, 3 年以上 Java 开发经验<br>2. 熟悉 Spring Boot、MySQL、Redis<br>3. 了解微服务与消息队列优先<br>4. 具备良好的编码规范与协作意识',
'负责产品后端服务与开放接口开发维护，保障系统稳定高效运行。',
8, 1),
('客户成功经理', '客户成功部', '成都', '10K-16K',
'1. 本科及以上学历, 2 年以上客户成功或售后经验<br>2. 熟悉 SaaS/企业软件续费与增购流程<br>3. 具备客户培训与关系经营能力<br>4. 沟通亲和、抗压能力强',
'负责客户上线后健康度管理、续费与增购，提升客户满意度与长期价值。',
9, 1),
('算法工程师 (工业数据方向)', '研发部', '上海', '20K-35K',
'1. 计算机/数学相关专业硕士优先<br>2. 熟悉机器学习与时序数据分析<br>3. 有工业质检、预测性维护等项目经验优先<br>4. 具备工程化落地能力',
'面向智能制造场景开展算法研发与模型落地，支撑质量分析与设备预测等能力。',
10, 1);

-- ========================================================
-- 友情链接
-- ========================================================
INSERT INTO links (name, url, logo, sort_order, status) VALUES
('工信部', 'https://www.miit.gov.cn', '', 1, 1),
('中国信通院', 'https://www.caict.ac.cn', '', 2, 1),
('华为云', 'https://www.huaweicloud.com', '', 3, 1),
('阿里云', 'https://www.aliyun.com', '', 4, 1),
('开源中国', 'https://www.oschina.net', '', 5, 1);
