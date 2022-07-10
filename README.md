<div align="center">
<img src="https://avatars.githubusercontent.com/u/76637246?s=200&v=4">
</div>

<div align="Center">
<h1> DeBio Network Background Worker</h1>
<h2> Decentralized Sovereign Biomed </h2>
The Anonymous-First Platform for Medical and Bioinformatics Data.

<br>
<br>

[![Node.js version](https://img.shields.io/badge/Node.js-%5E14.0.0-green?logo=Node.Js)](https://nodejs.org/)
[![NestJS version](https://img.shields.io/badge/NestJS-%5E8.0.0-red?logo=NestJS)](https://github.com/nestjs/nest)
[![Medium](https://img.shields.io/badge/Medium-DeBio%20Network-brightgreen?logo=medium)](https://blog.debio.network)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=debionetwork_debio-indexer&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=debionetwork_debio-indexer)
[![Builder](https://github.com/debionetwork/debio-indexer/actions/workflows/builder.yml/badge.svg)](https://github.com/debionetwork/debio-indexer/actions/workflows/builder.yml)
[![Tester](https://github.com/debionetwork/debio-indexer/actions/workflows/tester.yml/badge.svg)](https://github.com/debionetwork/debio-indexer/actions/workflows/tester.yml)

</div>

---

DeBio Network is a decentralized anonymous-first platform for medical and bioinformatics data. It uses blockchain technology as the immutable transaction ledger to support its processes.

Debio Indexer is service to handle event from substrate node and create index of data from event to elasticsearch.

# Substrate Handler
When this application is execute, `SubstrateController` will called and run `onApplicationBootstrap` to start listening event from substrate node.

In `onApplicationBootstrap` only have one line code `await this.substrateService.startListen();` this line will execute `await this.syncBlock();` to sync event substrate from last block (last block before service is shutdown) to current block, after sync old block, service will start to listen event and sync current block.

## Labs Event
Event from Lab Pallet. This event send data lab with this structure.
```
LabInfo {
  box_public_key: String;
  name: string;
  email: string;
  phone_number: string;
  website: string;
  country: string;
  region: string;
  city: string;
  address: string;
  latitude?: string;
  longitude?: string;
  profile_image?: string;
}
```
```
enum LabVerificationStatus {
  Unverified  = "Unverified",
  Verified    = "Verified",
  Rejected    = "Rejected",
  Revoked     = "Revoked",
}
```
```
Lab {
  accountId: string;
  services: string[];
  certifications: string[];
  verificationStatus: LabVerificationStatus;
  info: LabInfo;
}
```

### LabRegistered
Execute `LabRegisteredCommand` and called `LabRegisteredHandler`.

### LabUpdated
Execute `LabUpdatedCommand` and called `LabUpdatedHandler`.

### LabDeregistered
Execute `LabDeregisteredCommand` and called `LabDeregisteredHandler`.

### LabUpdateVerificationStatus
Execute `LabUpdateVerificationStatusCommand` and called `LabUpdateVerificationStatusHandler`.

## Orders Event
Event from Orders Pallets. This event send data orders with this structure.
```
enum OrderStatus {
  Unpaid    = "Unpaid",
  Paid      = "Paid",
  Fulfilled = "Fulfilled",
  Refunded  = "Refunded",
  Cancelled = "Cancelled",
  Failed    = "Failed",
}
```
```
enum Currency {
  DAI = "DAI",
  ETH = "ETH",
}
```
```
Price {
  component: string;
  value: string;
}
```
```
Orders {
    id: string;
	serviceId: string;
	customerId: string;
	customerBoxPublicKey: string;
	sellerId: string;
	dnaSampleTrackingId: string;
	currency: Currency;
	prices: Price[];
	additionalPrices: Price[];
	orderFlow: ServiceFlow;
	status: OrderStatus;
	createdAt: string;
	updatedAt: string;
}
```

### OrderCreated
Execute `OrderCreatedCommand` and called `OrderCreatedHandler`.
### OrderPaid
Execute `OrderPaidCommand` and called `OrderPaidHandler`.
### OrderFulfilled
Execute `OrderFulfilledCommand` and called `OrderFulfilledHandler`.
### OrderRefunded
Execute `OrderRefundedCommand` and called `OrderRefundedHandler`.
### OrderCancelled
Execute `OrderCancelledCommand` and called `OrderCancelledHandler`.
### OrderFailed
Execute `OrderFailedCommand` and called `OrderFailedHandler`.
## Services Event
Event from Services Pallets. This event send data services with this structure.
```
ServiceInfo {
    name: string;
    prices_by_currency: PriceByCurrency[];
    expected_duration: string;
    category: string;
    description: string;
    dna_collection_process?: string;
    test_result_sample: string;
    long_description?: string;
    image?: string;
}
```
```
enum ServiceFlow {
  RequestTest           = "RequestTest",
  StakingRequestService = "StakingRequestService"
}
```
```
Service {
  id: string;
  ownerId: string;
  info: ServiceInfo;
  serviceFlow: ServiceFlow;
}
```
### ServiceCreated
Execute `ServiceCreatedCommand` and called `ServiceCreatedHandler`.

### ServiceUpdated
Execute `ServiceUpdatedCommand` and called `ServiceUpdatedHandler`.

### ServiceDeleted
Execute `ServiceDeletedCommand` and called `ServiceDeletedHandler`.

## Genetic Testing Event
Event from Genetic Testing Pallets. This event send data data staked with this structure.
```
DataStaked {
    from: string;
    hashDataBounty: string;
    orderId: string;
}
```
### DataStaked
Execute `DataStakedCommand` and called `DataStakedHandler`.

## Service Request Event
Event from Service Request Pallets. This event send data request, service invoice, and claim request with this structure.
```
enum RequestStatus {
  Open                = "Open",
  WaitingForUnstaked  = "WaitingForUnstaked",
  Unstaked            = "Unstaked",
  Claimed             = "Claimed",
  Processed           = "Processed",
  Finalized           = "Finalized"
}
```
```
Request {
    hash: string;
    requester_address: string;
    lab_address: string;
    country: string;
    region: string;
    city: string;
    service_category: string;
    staking_amount: string;
    status: RequestStatus;
    created_at: string;
    updated_at: string;
    unstaked_at: string;
}
```
```
ServiceInvoice {
    requestHash: string;
    orderId: string;
    serviceId: string;
    customerAddress: string;
    sellerAddress: string;
    dnaSampleTrackingId: string;
    testingPrice: string;
    qcPrice: string;
    payAmount: string;
}
```
```
ClaimRequestModel {
  requestHash: string;
  labAddress: string;
  serviceId: string;
  testingPrice: string;
  qcPrice: string;
}
```
### ServiceRequestCreated
Execute `CreateServiceRequestCommand` and called `CreateServiceRequestHandler`.

### ServiceRequestClaimed
Execute `ClaimedServiceRequestCommand` and called `ClaimedServiceRequestHandler`.

### ServiceRequestProcessed
Execute `ProcessedServiceRequestCommand` and called `ProcessedServiceRequestHandler`.

### ServiceRequestFinalized
Execute `FinalizedServiceRequestCommand` and called `FinalizedServiceRequestHandler`.

### ServiceRequestUnstaked
Execute `UnstakedServiceRequestCommand` and called `UnstakedServiceRequestHandler`.

### ServiceRequestWaitingForUnstaked
Execute `UnstakedWaitingServiceRequestCommand` and called `UnstakedWaitingServiceRequestHandler`.

## Certifications Event
Event from Certifications Pallets. This event send data certification with this structure.
```
Info {
  title: string;
  issuer: string;
  month: string;
  year: string;
  description: string;
  supporting_document: string;
}
```
```
Certification {
  id: string;
  owner_id: string;
  info: Info
}
```
### CertificationCreated
Execute `CertificationCreatedCommand` and called `CertificationCreatedHandler`.

### CertificationUpdated
Execute `CertificationUpdatedCommand` and called `CertificationUpdatedHandler`.

### CertificationDeleted
Execute `CertificationDeletedCommand` and called `CertificationDeletedHandler`.

### Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
