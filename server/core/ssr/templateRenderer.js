// TODO: Refactor
module.exports = class TemplateRenderer {
  constructor(template) {
    const pattern = new RegExp(/(.*<head>)(.*)(<\/head>.*<\/noscript>)(.*)(<\/body>.*<\/html>)/s);
    let [, start, head, middle, body, end] = pattern.exec(template);

    if (!(start && head && middle && body && end)) {
      throw new Error("Template parsing error. Parts can not be empty");
    }

    const title = (() => {
      const titlePatern = new RegExp(/(.*)(<title>.*<\/title>)(.*)/s);
      const [, before, title, after] = titlePatern.exec(head);
      head = before + after;
      return title;
    })();

    body = body.replace('<div id="root"></div>', "");

    this.start = start;
    this.head = head;
    this.middle = middle;
    this.body = body;
    this.end = end;

    this.title = title;
    this.contentOutlet;
    this.state;

    this.addContent("");
    this.addState({});
  }

  addTitle(title) {
    this.title = `<title>${title}</title>`;
    return this;
  }

  addContent(body) {
    this.contentOutlet = `<div id="root">${body}</div>`;
    return this;
  }

  addState(state) {
    this.state = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(
      state
    )}</script>`;
    return this;
  }

  render() {
    return (
      this.start +
      this.head +
      this.title +
      this.middle +
      this.contentOutlet +
      this.state +
      this.body +
      this.end
    );
  }
};
