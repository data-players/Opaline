
import React from 'react';

const SanitizedHTML = ({text}) => {
  const safeHTMLTags = ['HTML', 'HEAD', 'BODY', 'STRONG', 'BR']
  const doc = new DOMParser().parseFromString(text, 'text/html');
  const htmlTags = Array.prototype.slice.call(doc.getElementsByTagName("*")).map(tag => tag.nodeName);
  const isSafeHTML = htmlTags.every((tag, index) => safeHTMLTags.includes(tag));
  if (isSafeHTML) {
    return <span dangerouslySetInnerHTML={{ __html: text }}/>;
  } else {
    return <span>text</span>;
  }
}

export default SanitizedHTML;