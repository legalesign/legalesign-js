export type BillingData = {
  customerName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  postcode: string;
  created: Date | null;
  modified: Date | null;
  cancelledAt: Date | null;
  billingContactEmail: string;
  billingContactEmailCc: string;
  technicalContactEmail: string;
  salesTax: number;
  attachInvoiceToEmails: string;
  invoiceCreditDays: string;
  docSendCredit: string;
  userLimit: number;
  userCount: number;
  libraryLimit: string;
  groupLimit: string;
  planName: string;
  paymentSystem: string;
  currency: string;
  alertCount: number;
  invoiceConnection: {
    invoices?: Invoice[];
  };
};

export type Invoice = {
  id: string;
  created: string;
  supplyDate: string;
  currency: string;
  paymentSystem: string;
  invoiceNumber: string;
  taxRate: number;
  subTotal: number;
  totalIncTax: number;
  creditReason: string;
  customerName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  /**
   * A miscellaneous address field only use if you've run out!
   *    @property address5
   */
  address5: string;
  postcode: string;
  lineItemConnection: {
    lineItems?: LineItem[];
  };
};

export type LineItem = {
  id: string;
  lineType:
    | "APISEND"
    | "AUTOMATEDSEND"
    | "BULKSEND"
    | "EMBED"
    | "FIXED"
    | "PERSEND"
    | "PERSUPPORTEDUSER"
    | "PERUSER"
    | "WEBSITESEND";
  description: string;
  taxRate: number;
  units: number;
  subTotal: number;
  absorb: boolean;
  notAbsorbable: boolean;
};
