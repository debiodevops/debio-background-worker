import { Orders } from "src/substrate/orders/models/orders";

export class RefundedOrderBlockCommand {
	constructor(public readonly blockNumber: number, public readonly order: Orders) {}
}