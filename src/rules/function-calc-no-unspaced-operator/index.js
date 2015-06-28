import {
  functionArguments,
  report,
  ruleMessages,
  styleSearch,
  whitespaceChecker
} from "../../utils"

export const ruleName = "function-calc-no-unspaced-operator"

export const messages = ruleMessages(ruleName, {
  expectedBefore: o => `Expected single space before "${o}" operator`,
  expectedAfter: o => `Expected single space after "${o}" operator`,
  expectedOperatorBeforeSign: o => `Expected an operator before sign "${o}"`,
})

export default function () {
  const checker = whitespaceChecker(" ", "always", messages)

  return (root, result) => {
    root.eachDecl(decl => {
      const value = decl.value

      functionArguments(value, "calc", expression => {

        checkSymbol("+")
        checkSymbol("-")
        checkSymbol("*")
        checkSymbol("/")

        function checkSymbol(symbol) {
          styleSearch({ source: expression, target: symbol, outsideFunctionalNotation: true }, match => {
            const index = match.startIndex

            // Deal with signs
            if ((symbol === "+" || symbol === "-") && /\d/.test(expression[index + 1])) {
              const expressionBeforeSign = expression.substr(0, index)
              // Ignore signs at the beginning of the expression
              if (/^\s*$/.test(expressionBeforeSign)) { return }

              // Otherwise, ensure that there is a real operator preceeding them
              if (/[\*/+-]\s*$/.test(expressionBeforeSign)) { return }

              report({
                message: messages.expectedOperatorBeforeSign(symbol),
                node: decl,
                result,
                ruleName,
              })

              return
            }

            checker.after({ index, source: expression, err: m =>
              report({
                message: m,
                node: decl,
                result,
                ruleName,
              }),
            })
            checker.before({ index, source: expression, err: m =>
              report({
                message: m,
                node: decl,
                result,
                ruleName,
              }),
            })
          })
        }
      })
    })
  }
}