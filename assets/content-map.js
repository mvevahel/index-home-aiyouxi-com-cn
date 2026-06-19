// assets/content-map.js
// 站点内容区域与搜索过滤工具（示例数据，非生产）

const siteUrl = "https://index-home-aiyouxi.com.cn";
const siteKeywords = ["爱游戏", "游戏攻略", "游戏评测", "新游推荐", "手游资讯"];

// 内容分区定义：每个分区包含标题、关键词标签、URL片段和摘要
const contentSections = [
  {
    id: "section-news",
    title: "游戏资讯",
    tags: ["爱游戏", "资讯", "新游"],
    url: siteUrl + "/news",
    summary: "最新游戏动态与行业消息"
  },
  {
    id: "section-guide",
    title: "攻略中心",
    tags: ["爱游戏", "攻略", "技巧"],
    url: siteUrl + "/guide",
    summary: "热门游戏详细攻略与心得"
  },
  {
    id: "section-review",
    title: "游戏评测",
    tags: ["爱游戏", "评测", "评分"],
    url: siteUrl + "/review",
    summary: "专业游戏评测与玩家反馈"
  },
  {
    id: "section-recommend",
    title: "新游推荐",
    tags: ["爱游戏", "推荐", "新游"],
    url: siteUrl + "/recommend",
    summary: "编辑精选新游推荐列表"
  },
  {
    id: "section-mobile",
    title: "手游大全",
    tags: ["爱游戏", "手游", "手机游戏"],
    url: siteUrl + "/mobile",
    summary: "海量手游资源与下载"
  }
];

/**
 * 根据关键词搜索匹配的内容分区
 * @param {string} query - 用户输入的搜索词
 * @returns {Array} 匹配的分区数组（原始引用）
 */
function searchSections(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const lowerQuery = query.toLowerCase();
  return contentSections.filter(function(section) {
    // 检查标题、标签、摘要是否包含查询词
    const inTitle = section.title.toLowerCase().indexOf(lowerQuery) !== -1;
    const inSummary = section.summary.toLowerCase().indexOf(lowerQuery) !== -1;
    const inTags = section.tags.some(function(tag) {
      return tag.toLowerCase().indexOf(lowerQuery) !== -1;
    });
    return inTitle || inSummary || inTags;
  });
}

/**
 * 根据标签筛选分区（支持多个标签，交集逻辑）
 * @param {Array} tagList - 标签数组
 * @returns {Array} 包含所有指定标签的分区
 */
function filterByTags(tagList) {
  if (!Array.isArray(tagList) || tagList.length === 0) {
    return [];
  }
  var lowerTags = tagList.map(function(t) { return t.toLowerCase(); });
  return contentSections.filter(function(section) {
    var sectionLowerTags = section.tags.map(function(t) { return t.toLowerCase(); });
    return lowerTags.every(function(lt) {
      return sectionLowerTags.indexOf(lt) !== -1;
    });
  });
}

// 示例：调用搜索函数
var exampleQuery = "爱游戏";
var searchResult = searchSections(exampleQuery);
console.log("搜索 \"" + exampleQuery + "\" 结果数:", searchResult.length);

// 示例：按标签过滤
var tagFilterResult = filterByTags(["爱游戏", "评测"]);
console.log("标签过滤结果数:", tagFilterResult.length);

// 导出（用于 Node.js 环境，也可在浏览器中直接使用）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteUrl: siteUrl,
    siteKeywords: siteKeywords,
    contentSections: contentSections,
    searchSections: searchSections,
    filterByTags: filterByTags
  };
}