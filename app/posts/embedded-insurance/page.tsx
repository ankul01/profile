import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Designing an Embedded Insurance Platform — Ankul Choudhry",
  description:
    "Architecture blueprint for EMs and Staff Engineers building embedded insurance platforms — product engines, policy issuance, financial ledgers, claims workflows, and IRDAI-ready reporting.",
};

export default function EmbeddedInsurancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-gray max-w-none">
        <header className="mb-8 not-prose">
          <Link
            href="/posts"
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
          >
            ← Back to Posts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Designing an Embedded Insurance Platform
          </h1>
          <p className="text-gray-500 mb-4">February 14, 2026</p>
          <div className="flex flex-wrap gap-2">
            {[
              "system-design",
              "insurance",
              "platform-engineering",
              "architecture",
              "fintech",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <h2>What is Embedded Insurance?</h2>

        <p>
          Embedded insurance is a distribution model where insurance is
          integrated directly into a primary product or transaction journey —
          rather than sold separately through agents or aggregators.
        </p>

        <p>
          <strong>Real-world examples:</strong>
        </p>

        <ul>
          <li>Device protection offered during mobile checkout</li>
          <li>Loan protection bundled with credit disbursement</li>
          <li>Travel insurance embedded in ticket booking</li>
          <li>Health cover attached to a subscription plan</li>
        </ul>

        <p>Unlike traditional agency or bancassurance models, embedded insurance is:</p>

        <ul>
          <li>
            <strong>Partner-distributed</strong> — e-commerce, fintech, NBFC,
            and travel platforms sell the product
          </li>
          <li>
            <strong>API-driven and real-time</strong> — no manual underwriting
            delays
          </li>
          <li>
            <strong>SKU-based</strong> — sellable units attached to transactions
          </li>
          <li>
            <strong>
              Operated under a Master Policy + Certificate of Insurance (COI)
              structure
            </strong>
          </li>
          <li>
            <strong>Highly automated</strong> — across issuance, finance, and
            claims
          </li>
        </ul>

        <hr />

        <h2>Key Structural Concepts</h2>

        <p>
          Before diving into architecture, these domain concepts are essential:
        </p>

        <table>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Master Policy</strong>
              </td>
              <td>
                A single contract issued to the partner (or aggregator) covering
                a defined cohort of customers
              </td>
            </tr>
            <tr>
              <td>
                <strong>Certificate of Insurance (COI)</strong>
              </td>
              <td>
                Individual proof of coverage issued to each insured under the
                master policy
              </td>
            </tr>
            <tr>
              <td>
                <strong>SKU</strong>
              </td>
              <td>
                The smallest sellable unit — a versioned plan with specific
                covers and pricing rules
              </td>
            </tr>
            <tr>
              <td>
                <strong>Cover</strong>
              </td>
              <td>
                Risk type (e.g., accidental damage, hospitalization, death)
              </td>
            </tr>
            <tr>
              <td>
                <strong>Benefit</strong>
              </td>
              <td>Payout construct within a cover</td>
            </tr>
            <tr>
              <td>
                <strong>Underwriting</strong>
              </td>
              <td>
                Assumed as a black-box service that returns eligibility and
                pricing modifiers
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>Part 1 — Platform Architecture Blueprint</h2>

        <h3>Product Hierarchy & SKU Design</h3>

        <p>
          This is the foundation of configurability. The product engine must
          support multiple lines of business (LOBs) without LOB-specific code.
        </p>

        <pre>
          <code>{`Product
  └── Plan (Versioned)
        └── Cover
              └── Benefit
                    └── Configurations`}</code>
        </pre>

        <p>
          <strong>Example SKU:</strong>
        </p>

        <pre>
          <code>{`{
  "sku_id": "LOAN_PROTECT_V3",
  "lob": "credit_life",
  "covers": [
    {
      "type": "death_cover",
      "sum_insured_formula": "loan_outstanding"
    }
  ],
  "pricing_model": "grid_v2",
  "eligibility_profile": "loan_basic_rules"
}`}</code>
        </pre>

        <p>
          <strong>Design Principles:</strong>
        </p>

        <ol>
          <li>
            <strong>Versioning is mandatory.</strong> Plans must be immutable
            once published. Never modify live plans — create a new version,
            soft-deprecate the old one, and maintain backward compatibility.
          </li>
          <li>
            <strong>Partner overlays stay separate.</strong> Partners may
            require custom pricing, modified eligibility, or commission
            overrides. Keep overrides in a separate layer from the base product
            definition:
          </li>
        </ol>

        <pre>
          <code>{`Base Plan
   +
Partner Override Layer`}</code>
        </pre>

        <hr />

        <h3>Integrations Layer</h3>

        <p>
          Embedded insurance must support multiple integration modes to serve
          different partner types.
        </p>

        <h4>API-Based (Real-Time)</h4>

        <p>
          Used by e-commerce, fintech lending, BNPL, and wallet integrations.
        </p>

        <pre>
          <code>{`Partner → Proposal API → Eligibility → Pricing → Issuance → COI`}</code>
        </pre>

        <p>Design requirements:</p>
        <ul>
          <li>Idempotency keys on every mutating call</li>
          <li>Versioned APIs</li>
          <li>Async event notifications (webhooks)</li>
          <li>Timeout-safe retry logic</li>
        </ul>

        <h4>POS / SDK Integrations</h4>

        <p>Used for offline stores and agent-assisted selling:</p>
        <ul>
          <li>Token-based authentication</li>
          <li>Embedded UI SDK with local validation + backend confirmation</li>
        </ul>

        <h4>Offline (SFTP / Batch)</h4>

        <p>Used by NBFCs and enterprise partners:</p>
        <ul>
          <li>
            Batch file upload → Validation pipeline → Pricing + Eligibility →
            Bulk issuance → Reconciliation report
          </li>
          <li>
            Must include file checksum validation, row-level error reporting,
            and reprocessing capability
          </li>
        </ul>

        <hr />

        <h3>Pricing Engine (Grid-Based)</h3>

        <p>
          Embedded insurance typically uses grid-based pricing rather than
          actuarial models at runtime.
        </p>

        <p>
          <strong>Example pricing grid:</strong>
        </p>

        <table>
          <thead>
            <tr>
              <th>Age Band</th>
              <th>Loan Tenure</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18–40</td>
              <td>&lt; 24 months</td>
              <td>0.8%</td>
            </tr>
            <tr>
              <td>41–60</td>
              <td>&lt; 24 months</td>
              <td>1.2%</td>
            </tr>
            <tr>
              <td>18–40</td>
              <td>&gt; 24 months</td>
              <td>1.1%</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Resolution flow:</strong>
        </p>

        <pre>
          <code>{`Pricing Input → Grid Resolver → Rate Selection → Premium Calculator`}</code>
        </pre>

        <p>Key considerations:</p>
        <ul>
          <li>Grid versioning (old grids must remain queryable)</li>
          <li>Partner-level overrides</li>
          <li>Preloading grids in memory for performance</li>
          <li>Formula abstraction — no hardcoded logic</li>
        </ul>

        <hr />

        <h3>Eligibility Engine</h3>

        <p>
          Eligibility rules can be static (mandatory field validation),
          rule-based (config-driven), or underwriting-triggered (external
          service).
        </p>

        <p>
          <strong>Example Rule DSL:</strong>
        </p>

        <pre>
          <code>{`IF loan_amount > 5L THEN reject
IF age > 65 THEN reject
IF pincode IN blacklist THEN reject`}</code>
        </pre>

        <p>
          <strong>Fail strategy:</strong>
        </p>
        <ul>
          <li>
            <strong>Fail-closed</strong> — reject if rules are unavailable
            (preferred for insurance)
          </li>
          <li>
            <strong>Fail-open</strong> — allow issuance if non-critical (only
            with explicit approval)
          </li>
        </ul>

        <hr />

        <h3>Failure Handling</h3>

        <p>
          Embedded insurance platforms must handle complex failure scenarios
          gracefully.
        </p>

        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Payment success, issuance failure</strong>
              </td>
              <td>
                Compensation workflow → Retry issuance → If irrecoverable,
                trigger refund + reversal entry
              </td>
            </tr>
            <tr>
              <td>
                <strong>PAS (Policy Admin System) timeout</strong>
              </td>
              <td>
                Async confirmation → Track `pending_issuance` state → Reconcile
                via event listener
              </td>
            </tr>
            <tr>
              <td>
                <strong>Duplicate requests</strong>
              </td>
              <td>
                Idempotency keys + unique proposal reference ID + state-based
                validation
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h3>Float Balance / Partner Ledger</h3>

        <p>Two common financial models:</p>

        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>How It Works</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Pre-funded (Float)</strong>
              </td>
              <td>Partner maintains a balance. Debit float → Issue policy</td>
            </tr>
            <tr>
              <td>
                <strong>Post-paid Commission</strong>
              </td>
              <td>Insurer settles commission periodically</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Float ledger design (high-level):</strong>
        </p>

        <pre>
          <code>{`partner_wallet:     | partner_id | balance |
wallet_transactions: | txn_id | partner_id | debit | credit | reference_id |`}</code>
        </pre>

        <p>
          Settlement cycle: Daily premium collection summary → Commission
          deduction → Net settlement report.
        </p>

        <p>
          <strong>The ledger must be immutable.</strong>
        </p>

        <hr />

        <h3>Certificate of Insurance (COI)</h3>

        <p>COI lifecycle:</p>

        <pre>
          <code>{`Policy Issued → Data bound to template → PDF generated → Stored in object storage → URL returned`}</code>
        </pre>

        <p>Design requirements:</p>
        <ul>
          <li>Versioned templates with dynamic placeholders</li>
          <li>Template audit trail</li>
          <li>Re-generation capability</li>
          <li>
            Must reference: master policy number, certificate number, coverage
            details
          </li>
        </ul>

        <hr />

        <h3>Claims System</h3>

        <pre>
          <code>{`FNOL → Documents Pending → Assessment → Approved / Rejected → Paid`}</code>
        </pre>

        <p>
          Key data points per claim: Claim ID, Policy reference, Reserve amount,
          Paid amount, Fraud flags.
        </p>

        <p>
          <strong>Reserve vs Paid</strong> — Reserve is the expected liability;
          Paid is the actual settlement. Reserve tracking is critical for
          regulatory reporting.
        </p>

        <hr />

        <h3>Reporting Architecture</h3>

        <p>
          Embedded insurance must support both regulatory (IRDAI) and partner
          reporting.
        </p>

        <p>
          <strong>Core registers:</strong>
        </p>

        <table>
          <thead>
            <tr>
              <th>Register</th>
              <th>Key Fields</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Premium Register</td>
              <td>policy_id, premium, tax, net</td>
            </tr>
            <tr>
              <td>Claims Paid Register</td>
              <td>claim_id, amount_paid, payout_date</td>
            </tr>
            <tr>
              <td>Claims Reserve Register</td>
              <td>claim_id, reserve_amount</td>
            </tr>
            <tr>
              <td>Commission Register</td>
              <td>partner_id, commission_amount</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Architecture:</strong>
        </p>

        <pre>
          <code>{`Operational DB → Event Stream → Reporting Warehouse → Regulatory / Partner Reports`}</code>
        </pre>

        <p>Never run heavy reports on the transactional database.</p>

        <p>
          <strong>IRDAI reporting considerations:</strong> Monthly premium
          summaries, claim ratio reporting, product-wise data segregation,
          audit-ready exports.
        </p>

        <hr />

        <h2>Part 2 — Domain Model & Entity-Relationship Design</h2>

        <p>
          This section maps the architecture into a production-grade domain
          model, organized by bounded context.
        </p>

        <h3>Bounded Contexts</h3>

        <p>The platform is organized into 6 isolated contexts:</p>

        <ol>
          <li>
            <strong>Product Configuration</strong> — Product, Plan, Cover,
            Benefit, SKU
          </li>
          <li>
            <strong>Pricing & Eligibility</strong> — Grid models, rule
            definitions
          </li>
          <li>
            <strong>Policy & Issuance</strong> — Proposal, Underwriting, Policy,
            Certificate
          </li>
          <li>
            <strong>Claims</strong> — Claim lifecycle, documents, payments
          </li>
          <li>
            <strong>Finance & Ledger</strong> — Double-entry accounts, float
            wallet
          </li>
          <li>
            <strong>Partner & Overlay</strong> — Partner config, plan overrides
          </li>
        </ol>

        <hr />

        <h3>Product & SKU Entities</h3>

        <pre>
          <code>{`product
  id            UUID
  name          string
  lob           string     (device / health / credit)
  status        enum       (draft / active / deprecated)

plan
  id            UUID
  product_id    FK(product)
  version       integer
  effective_from date
  effective_to  date
  status        enum       ← Immutable once active

plan_cover
  id            UUID
  plan_id       FK(plan)
  cover_type    string
  sum_insured_formula string

cover_benefit
  id            UUID
  plan_cover_id FK(plan_cover)
  benefit_type  string
  payout_logic  json

sku
  id            UUID
  plan_id       FK(plan)
  sku_code      string
  pricing_model_id FK(pricing_model)
  eligibility_profile_id FK(eligibility_profile)`}</code>
        </pre>

        <p>
          SKU is the <strong>sellable layer</strong> — the unit partners
          interact with.
        </p>

        <hr />

        <h3>Pricing & Eligibility Entities</h3>

        <pre>
          <code>{`pricing_model
  id            UUID
  type          enum(grid / formula)
  version       integer

pricing_grid
  id            UUID
  pricing_model_id FK
  param_1       string
  param_2       string
  rate          decimal

eligibility_profile
  id            UUID
  rule_definition json
  version       integer     ← Rules stored as DSL JSON`}</code>
        </pre>

        <hr />

        <h3>Proposal → Policy Issuance Entities</h3>

        <pre>
          <code>{`Proposal → Underwriting Decision → Policy → Certificate`}</code>
        </pre>

        <pre>
          <code>{`proposal
  id            UUID
  partner_id    FK(partner)
  sku_id        FK(sku)
  status        enum(draft / submitted / approved / rejected)
  premium_amount decimal
  meta          json

underwriting_decision
  id            UUID
  proposal_id   FK
  decision      enum(approved / rejected / manual)
  score         decimal
  reason        string

policy
  id            UUID
  master_policy_id FK(master_policy)
  proposal_id   FK
  policy_number string
  status        enum(issued / active / cancelled / expired)
  start_date    date
  end_date      date

certificate
  id            UUID
  policy_id     FK
  certificate_number string
  pdf_url       string
  template_version integer

master_policy
  id            UUID
  insurer_reference string
  partner_id    FK
  product_id    FK
  start_date    date
  end_date      date`}</code>
        </pre>

        <hr />

        <h3>Claims Entities</h3>

        <pre>
          <code>{`Policy → Claim → Claim_Event / Claim_Document / Claim_Payment`}</code>
        </pre>

        <pre>
          <code>{`claim
  id            UUID
  policy_id     FK
  status        enum
  loss_date     date
  reserve_amount decimal
  approved_amount decimal

claim_event
  id            UUID
  claim_id      FK
  event_type    string
  created_at    timestamp

claim_document
  id            UUID
  claim_id      FK
  doc_type      string
  storage_url   string

claim_payment
  id            UUID
  claim_id      FK
  amount        decimal
  payout_date   date
  payment_reference string`}</code>
        </pre>

        <hr />

        <h3>Finance & Ledger Entities</h3>

        <p>
          <strong>This is the most critical section.</strong> Never mix business
          tables with ledger tables.
        </p>

        <pre>
          <code>{`ledger_account
  id            UUID
  account_type  enum(premium_receivable, insurer_payable,
                     commission_payable, claims_payable)
  owner_type    enum(system, partner, insurer)
  owner_id      UUID

ledger_entry                    ← IMMUTABLE TABLE
  id            UUID
  debit_account_id  FK
  credit_account_id FK
  amount        decimal
  reference_type enum(policy, claim, refund)
  reference_id  UUID
  created_at    timestamp`}</code>
        </pre>

        <p>
          <strong>Float wallet:</strong>
        </p>

        <pre>
          <code>{`partner_wallet
  partner_id    UUID
  balance       decimal

wallet_txn
  id            UUID
  partner_id    UUID
  debit         decimal
  credit        decimal
  reference_id  UUID`}</code>
        </pre>

        <hr />

        <h3>Partner & Overlay Entities</h3>

        <pre>
          <code>{`partner
  id            UUID
  name          string
  integration_mode enum(api / pos / batch)

partner_plan_override
  id            UUID
  partner_id    FK
  sku_id        FK
  pricing_override json
  commission_override decimal`}</code>
        </pre>

        <hr />

        <h3>Relationship Summary</h3>

        <pre>
          <code>{`Partner
   └── Master_Policy
         └── Policy
               └── Certificate
               └── Claim → Claim_Payment

Product
   └── Plan
         └── SKU
               └── Proposal → Policy

Policy / Claim → Ledger_Entry`}</code>
        </pre>

        <hr />

        <h2>Part 3 — End-to-End Issuance Flow</h2>

        <p>
          This section moves from static design to{" "}
          <strong>runtime system behavior</strong>. We walk through a complete
          issuance cycle for a loan protection product using a pre-funded float
          model.
        </p>

        <blockquote>
          <strong>Scenario:</strong> Partner is an NBFC. Product is Loan
          Protection Insurance. Financial model is pre-funded float. Underwriting
          is abstracted (assume approval).
        </blockquote>

        <h3>High-Level Flow</h3>

        <pre>
          <code>{`Partner → Proposal API → Eligibility → Pricing → Underwriting
    ↓
Policy Issuance
    ↓
Ledger Posting (Premium, Commission, Insurer Payable)
    ↓
COI Generation
    ↓
Event Emission
    ↓
Reporting Pipeline`}</code>
        </pre>

        <hr />

        <h3>Step 1: Proposal Creation</h3>

        <p>
          <strong>API request:</strong>
        </p>

        <pre>
          <code>{`{
  "partner_id": "NBFC_X",
  "sku_id": "LOAN_PROTECT_V3",
  "insured": {
    "loan_amount": 500000,
    "tenure": 36,
    "age": 32
  },
  "idempotency_key": "loan_12345"
}`}</code>
        </pre>

        <p>
          <strong>System actions:</strong>
        </p>
        <ol>
          <li>Validate partner</li>
          <li>Fetch SKU + plan version</li>
          <li>Run eligibility rules</li>
          <li>Resolve pricing grid</li>
          <li>Call underwriting engine (abstracted)</li>
          <li>Persist proposal</li>
        </ol>

        <p>
          <strong>Database writes:</strong>
        </p>

        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>id</th>
              <th>status</th>
              <th>premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>proposal</td>
              <td>P1</td>
              <td>approved</td>
              <td>4500</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>proposal_id</th>
              <th>decision</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>underwriting_decision</td>
              <td>P1</td>
              <td>approved</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h3>Step 2: Policy Issuance</h3>

        <p>
          Issuance <strong>must be idempotent</strong>. Issuance and ledger
          posting must occur in a{" "}
          <strong>single atomic transaction</strong> or with event-sourced
          compensation.
        </p>

        <p>
          <strong>Database writes:</strong>
        </p>

        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>id</th>
              <th>proposal_id</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>policy</td>
              <td>POL1</td>
              <td>P1</td>
              <td>issued</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>id</th>
              <th>policy_id</th>
              <th>certificate_no</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>certificate</td>
              <td>C1</td>
              <td>POL1</td>
              <td>CERT_123</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h3>Step 3: Ledger Posting (Financial Core)</h3>

        <p>
          <strong>This is where most naive systems fail.</strong>
        </p>

        <p>
          Assume: Premium = 4500, Commission = 900, Insurer share = 3600.
        </p>

        <p>
          <strong>Ledger accounts involved:</strong>
        </p>

        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Premium Receivable</td>
              <td>System</td>
            </tr>
            <tr>
              <td>Insurer Payable</td>
              <td>Insurer</td>
            </tr>
            <tr>
              <td>Partner Commission Payable</td>
              <td>Partner</td>
            </tr>
            <tr>
              <td>Partner Float Wallet</td>
              <td>Partner</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Journal entries (double-entry):</strong>
        </p>

        <p>
          <strong>Entry 1 — Deduct float:</strong>
        </p>

        <pre>
          <code>{`Debit:  Partner Float Wallet        4500
Credit: Premium Receivable          4500`}</code>
        </pre>

        <p>
          <strong>Entry 2 — Allocate premium to insurer:</strong>
        </p>

        <pre>
          <code>{`Debit:  Premium Receivable          4500
Credit: Insurer Payable             3600
Credit: Partner Commission Payable   900`}</code>
        </pre>

        <p>
          All entries are stored in `ledger_entry` —{" "}
          <strong>immutable, append-only</strong>.
        </p>

        <hr />

        <h3>Step 4: COI Generation</h3>

        <ol>
          <li>Load template version</li>
          <li>Bind policy + insured data</li>
          <li>Generate PDF</li>
          <li>Store in object storage</li>
          <li>Update certificate record with `pdf_url`</li>
        </ol>

        <hr />

        <h3>Step 5: Emit Domain Events</h3>

        <pre>
          <code>{`{
  "event_type": "policy_issued",
  "policy_id": "POL1",
  "premium": 4500,
  "commission": 900
}`}</code>
        </pre>

        <p>
          <strong>Event bus consumers:</strong>
        </p>
        <ul>
          <li>Reporting pipeline</li>
          <li>Settlement service</li>
          <li>Partner webhook notification</li>
        </ul>

        <hr />

        <h3>Reporting Pipeline</h3>

        <pre>
          <code>{`Operational DB → CDC / Event Stream → Reporting Warehouse → IRDAI Reports / Partner Dashboards`}</code>
        </pre>

        <p>
          <strong>Registers generated from this issuance:</strong>
        </p>

        <table>
          <thead>
            <tr>
              <th>Register</th>
              <th>Key Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Premium Register</td>
              <td>POL1, gross: 4500, tax: 0, net: 4500</td>
            </tr>
            <tr>
              <td>Commission Register</td>
              <td>NBFC_X, POL1, commission: 900</td>
            </tr>
            <tr>
              <td>Insurer Payable Report</td>
              <td>InsurerA, total: 3600</td>
            </tr>
            <tr>
              <td>Float Balance Snapshot</td>
              <td>NBFC_X, balance: old - 4500</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h3>Settlement Cycle (T+1)</h3>

        <p>At settlement time:</p>

        <pre>
          <code>{`Debit:  Insurer Payable                3600
Credit: Bank Settlement Account        3600

Debit:  Partner Commission Payable      900
Credit: Partner Bank Account            900`}</code>
        </pre>

        <hr />

        <h3>Claims Impact on Ledger</h3>

        <p>
          <strong>When claim is approved (reserve created):</strong>
        </p>

        <pre>
          <code>{`Debit:  Claims Expense
Credit: Claims Reserve`}</code>
        </pre>

        <p>
          <strong>When claim is paid:</strong>
        </p>

        <pre>
          <code>{`Debit:  Claims Reserve
Credit: Bank Account`}</code>
        </pre>

        <p>Reserve tracking feeds IRDAI reporting directly.</p>

        <hr />

        <h2>Part 4 — Failure Scenarios & Recovery</h2>

        <h3>Scenario A: Policy Created, Ledger Fails</h3>

        <p>
          Wrap issuance + ledger in a DB transaction, <strong>or</strong> use an
          event-driven compensation workflow.
        </p>

        <p>If ledger posting fails:</p>
        <ol>
          <li>Mark policy as `issuance_pending`</li>
          <li>Retry ledger posting</li>
          <li>
            Never leave a policy in `issued` state without corresponding ledger
            entries
          </li>
        </ol>

        <h3>Scenario B: Ledger Posted, COI Fails</h3>

        <p>
          Non-financial failure. Retry COI generation independently.{" "}
          <strong>
            Never reverse ledger entries for a document generation failure.
          </strong>
        </p>

        <h3>Scenario C: Float Insufficient</h3>

        <p>Pre-check before issuance:</p>

        <pre>
          <code>{`IF float_balance < premium THEN reject`}</code>
        </pre>

        <p>Or move the partner to a credit-based model.</p>

        <h3>Scenario D: Reporting Lag</h3>

        <p>
          Reporting must be <strong>eventually consistent</strong>. Never block
          issuance for a reporting write.
        </p>

        <hr />

        <h2>Part 5 — Reconciliation & Data Consistency</h2>

        <h3>Daily Reconciliation Jobs</h3>

        <p>Compare across systems:</p>
        <ul>
          <li>Ledger premium total vs. float deductions</li>
          <li>Float deductions vs. insurer payable</li>
          <li>Insurer payable vs. settlement records</li>
        </ul>

        <p>
          Detect breakage: missing ledger entries, duplicate entries, negative
          balances.
        </p>

        <h3>Production-Grade Guarantees</h3>

        <p>
          <strong>Use:</strong>
        </p>
        <ul>
          <li>Idempotency keys on all mutating APIs</li>
          <li>Unique constraints on proposal references</li>
          <li>Immutable ledger (append-only, no updates)</li>
          <li>Versioned pricing models</li>
          <li>Event replay safety</li>
        </ul>

        <p>
          <strong>Avoid:</strong>
        </p>
        <ul>
          <li>Updating ledger rows (ever)</li>
          <li>Coupling reporting DB to transactional DB</li>
          <li>Hardcoding commission logic</li>
          <li>Running reports on the operational database</li>
        </ul>

        <hr />

        <h2>Architectural Observations</h2>

        <table>
          <thead>
            <tr>
              <th>Principle</th>
              <th>How It&apos;s Achieved</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Separation of concerns</strong>
              </td>
              <td>
                Product config, transactions, ledger, and reporting are isolated
                bounded contexts
              </td>
            </tr>
            <tr>
              <td>
                <strong>Multi-LOB safe</strong>
              </td>
              <td>
                No LOB-specific tables — differences handled via JSON fields,
                cover types, and rule engine
              </td>
            </tr>
            <tr>
              <td>
                <strong>Regulatory ready</strong>
              </td>
              <td>
                Immutable ledger, audit log, versioned products, reserve
                tracking
              </td>
            </tr>
            <tr>
              <td>
                <strong>Partner scalable</strong>
              </td>
              <td>
                Override layer keeps partner customizations decoupled from base
                product
              </td>
            </tr>
            <tr>
              <td>
                <strong>Failure isolated</strong>
              </td>
              <td>
                Each subsystem can fail independently without corrupting
                financial state
              </td>
            </tr>
            <tr>
              <td>
                <strong>Event-driven extensibility</strong>
              </td>
              <td>
                Domain events decouple issuance from reporting, settlement, and
                notifications
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>Closing Thought</h2>

        <p>
          Embedded insurance is not just about attaching a plan to a checkout
          screen.
        </p>

        <p>It is about building:</p>
        <ul>
          <li>
            A <strong>configurable product engine</strong> that supports multiple
            LOBs
          </li>
          <li>
            A <strong>reliable issuance pipeline</strong> with idempotency and
            failure recovery
          </li>
          <li>
            A <strong>financially correct ledger</strong> using double-entry
            accounting
          </li>
          <li>
            A <strong>scalable claims workflow</strong> with reserve tracking
          </li>
          <li>
            A <strong>compliant reporting backbone</strong> ready for regulatory
            scrutiny
          </li>
        </ul>

        <p>
          When designed properly, this becomes a{" "}
          <strong>reusable insurance infrastructure layer</strong> that can
          support multiple partners, multiple lines of business, multiple
          distribution models, high transaction scale, and strict regulatory
          requirements — all without rewriting the core.
        </p>
      </article>
    </div>
  );
}
