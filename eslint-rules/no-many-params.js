const noManyParamsRule = {
  meta: {
    type: "suggestion",
    messages: {
      tooManyParams:
        "Function with 3+ parameters must use a single object argument.",
    },
  },

  create(context) {
    return {
      ":function"(node) {
        const params = node.params;

        if (params.length >= 3) {
          context.report({
            node,
            messageId: "tooManyParams",
          });
        }
      },
    };
  },
};

export default noManyParamsRule;
