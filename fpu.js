class FloatingPointCoprocessor {
    constructor() {
        this.reset();
    }

    reset() {
        this.registers = {
            opA: 0.0,
            opB: 0.0,
            result: 0.0
        };

        this.operation = "IDLE";
        this.status = "Ready";
        this.error = null;
    }

    execute(operation, a, b) {
        this.registers.opA = Number(a);
        this.registers.opB = Number(b);
        this.operation = operation;
        this.error = null;

        try {
            switch (operation) {

                case "FADD":
                    this.registers.result =
                        this.registers.opA + this.registers.opB;
                    break;

                case "FSUB":
                    this.registers.result =
                        this.registers.opA - this.registers.opB;
                    break;

                case "FMUL":
                    this.registers.result =
                        this.registers.opA * this.registers.opB;
                    break;

                case "FDIV":
                    if (this.registers.opB === 0) {
                        throw new Error("Division entre cero");
                    }

                    this.registers.result =
                        this.registers.opA / this.registers.opB;
                    break;

                default:
                    throw new Error("Operación FPU no válida");
            }

            this.status = "Completed";

        } catch (error) {
            this.status = "Error";
            this.error = error.message;
            this.registers.result = 0;
        }

        return this.registers.result;
    }

    getStatus() {
        return {
            operation: this.operation,
            status: this.status,
            opA: this.registers.opA,
            opB: this.registers.opB,
            result: this.registers.result,
            error: this.error
        };
    }
}

if (typeof module !== "undefined") {
    module.exports = FloatingPointCoprocessor;
}