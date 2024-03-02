export const getTextAlignClassName: any = (contentBlock: any) => {
  switch (contentBlock.getData().get("textAlign")) {
    case "ALIGN_LEFT":
      return "text-left";

    case "ALIGN_CENTER":
      return "text-center";

    case "ALIGN_RIGHT":
      return "text-right";

    case "ALIGN_JUSTIFY":
      return "text-justify";

    default:
      return "";
  }
};

export const getTextAlignStyles = (contentBlock: any) => {
  switch (contentBlock.getData().get("textAlign")) {
    case "ALIGN_LEFT":
      return {
        style: {
          textAlign: "left",
        },
      };

    case "ALIGN_CENTER":
      return {
        style: {
          textAlign: "center",
        },
      };

    case "ALIGN_RIGHT":
      return {
        style: {
          textAlign: "right",
        },
      };

    case "ALIGN_JUSTIFY":
      return {
        style: {
          textAlign: "justify",
        },
      };

    default:
      return {};
  }
};

export const getTextAlignBlockMetadata: any = (element: any) => {
  switch (element.style.textAlign) {
    case "right":
      return {
        data: {
          textAlign: "ALIGN_RIGHT",
        },
      };

    case "center":
      return {
        data: {
          textAlign: "ALIGN_CENTER",
        },
      };

    case "justify":
      return {
        data: {
          textAlign: "ALIGN_JUSTIFY",
        },
      };

    case "left":
      return {
        data: {
          textAlign: "ALIGN_LEFT",
        },
      };

    default:
      return {};
  }
};
