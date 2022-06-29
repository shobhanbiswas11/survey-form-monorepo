export { default as clx } from "classnames";
export { generate as generateId } from "shortid";

export function removeFalsy<T>(arr: (undefined | T)[]) {
  return arr.filter(Boolean) as T[];
}

export function downloadAsJson(data: any, filename: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data))
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
