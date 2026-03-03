export default {
  meta: {
    type: "suggestion",
    messages: {
      tooManyParams:
        "Function with 3+ parameters must use a single object argument.",
    },
  },
  create(context) {
    console.log("Rule loaded");
    return {
      ":function"(node) {
        const params = node.params;

        if (params.length >= 3) {
          console.log("Rule loaded 2", params);
          context.report({
            node,
            messageId: "tooManyParams",
          });
        }
      },
    };
  },
};
