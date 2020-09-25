class Calculator{
  constructor(previousOperandTextElement,currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
  }
  clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1)

  }
  appendNumber(number){
    if(number ==="." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation){
    if(this.currentOperand === "") return
    if(this.previousOperand ===""){
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand =""  
  }
  compute(){
    let computation 
    const previous = perseFloat(this.previousOperand)
    const current = perseFloat(this.currentOperand)
    if(isNaN(previous) || isNaN (current)) return
    switch(this.operation){
      case '+':
        computation = previous + current
      break
      case '-':
      computation = previous - current
      break
      case '*':
        computation = previous * current
        break
        case '/':
          computation = previous / current
          break
          default:
          return
        }
        this.currentOperand = computation
        this.operation = undefined
        this. previousOperand = ''
      }
      getDisplayNumber(number){
        const stringNumber =number.toString()
        const integerDigits = perseFloat(stringNumber.split('.'[0]))
        const decimalDigits = stringNumber.split('.')[0]
        let integerDisplay
        if (isNaN(integerDigits)){
          integerDisplay = ""
        } 
        else{
          integerDisplay = integerDigits.toLocalString("en",{
            maximumFractionDigits:0
          })
          if(decimalDigits != null){
            return '${integerdisplay}.${decimalDigits}'
          }
          else{
            return integerDisplay 
          }
        }
      }
  updatedisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand
    if(this.operation !=null){
      this.previousOperandTextElement.innerText = this.previousOperand =
      '${this.previousOperand} ${this.operation}'
    }
    else{
      this.previousOperandTextElement.innerText = this.previousOperand = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const Calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click',() =>{
    Calculator.appendNumber(button.innerText)
    Calculator.updatedisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click',() =>{
    Calculator.appendNumber(button.innerText)
    Calculator.updatedisplay()
  })
})

equalsButton.addEventListener('click', button => {
  Calculator.compute()
  Calculator.updatedisplay()
})

allClearButton.addEventListener('click', button => {
  Calculator.clear()
  Calculator.updatedisplay()
})

deleteButton.addEventListener('click', button => {
  Calculator.delete()
  Calculator.updatedisplay()
})
