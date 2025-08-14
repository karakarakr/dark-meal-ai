export const stripHTMLandMarkdown = (text) => {
    let cleaned = text.replace(/<\/?[^>]+(>|$)/g, "");
  
    cleaned = cleaned
      .replace(/(\*\*|__)(.*?)\1/g, "$2") 
      .replace(/(\*|_)(.*?)\1/g, "$2")
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1")
      .replace(/~~(.*?)~~/g, "$1")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/^\s{0,3}>\s?/gm, "")
      .replace(/^\s{0,3}[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/#{1,6}\s*/g, "");
  
    return cleaned.trim();
}