import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Ankul Choudhry",
  description:
    "Engineering Leader | Platforms, Distributed Systems & Partner Integrations | Embedded Insurance | Ex-Snapdeal | NIT Trichy",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-gray max-w-none">
        <p className="lead text-lg text-gray-700">
          Engineering leader with <strong>14+ years of experience</strong>{" "}
          building and scaling low-latency, high-throughput platforms in
          fintech, insurance, and e-commerce. I lead organizations of 15+
          engineers, owning mission-critical backend systems end-to-end — from
          architecture and design through production operations.
        </p>

        <p>
          My work sits at the intersection of{" "}
          <strong>engineering depth and organizational leadership</strong> —
          architecting systems that handle 25K–30K+ RPM under strict correctness
          and regulatory constraints, while building teams and processes that
          deliver predictably in fast-moving environments.
        </p>

        <hr />

        <h2>Experience</h2>

        <h3>Senior Engineering Manager — Acko General Insurance</h3>
        <p className="text-sm text-gray-500">Oct 2025 – Present | Bangalore</p>

        <ul>
          <li>
            Lead and grow a multi-layered engineering organization of{" "}
            <strong>15+ engineers</strong>, including senior engineers and team
            leads, owning platforms across embedded insurance, lending, and
            partner integrations
          </li>
          <li>
            Own end-to-end lifecycle of highly scalable{" "}
            <strong>Java/Spring Boot microservices handling 30K+ RPM</strong>{" "}
            under strict regulatory and correctness constraints
          </li>
          <li>
            Architect and scale core platforms to reduce technical debt, improve
            performance, and support rapid onboarding of new business use cases
            without service disruption
          </li>
          <li>
            Lead by example through hands-on involvement in{" "}
            <strong>
              architecture reviews, critical backend components, and design
              decisions
            </strong>{" "}
            for high-throughput transactional systems
          </li>
          <li>
            Partner closely with Product, Business, and Compliance teams to
            translate complex requirements into reliable, production-grade
            systems delivered on predictable timelines
          </li>
          <li>
            Strengthen claims risk controls via{" "}
            <strong>ML-based fraud detection</strong>, improving detection
            accuracy by ~40% while reducing manual claim reviews
          </li>
          <li>
            Drive adoption of <strong>AI-assisted development workflows</strong>
            , reducing development cycle time by ~25% and improving sprint
            predictability
          </li>
        </ul>

        <h3>Engineering Manager — Acko General Insurance</h3>
        <p className="text-sm text-gray-500">Dec 2022 – Sep 2025 | Bangalore</p>

        <ul>
          <li>
            Scaled embedded insurance platforms to <strong>30K+ RPM</strong>,
            improving reliability, observability, and operational resilience
          </li>
          <li>
            Led <strong>zero-downtime migration</strong> of high-throughput
            issuance and claims systems (peaks ~2,000 policies/min) to a unified
            core platform — improving uptime by ~25% and scalability by ~30%
          </li>
          <li>
            Built a multi-brand dealer POS platform with real-time settlement,
            tax validation, and async reporting; onboarded{" "}
            <strong>500+ dealers</strong> and enabled ~₹100 Cr annualized
            throughput
          </li>
          <li>
            Designed a reusable, standardized integration platform across
            multiple lines of business — reduced integration timelines by ~50%
            and improved engineering efficiency by ~40%
          </li>
          <li>
            Built <strong>self-service onboarding frameworks</strong>, cutting
            partner setup time from ~1 week to ~2 hours
          </li>
          <li>
            Established a new regulated{" "}
            <strong>Life Insurance LOB from scratch</strong> and delivered an
            industry-first hybrid insurance product
          </li>
          <li>
            Remained hands-on with critical backend components, design reviews,
            and architecture decisions
          </li>
        </ul>

        <h3>Engineering Manager / Lead Software Engineer — Snapdeal</h3>
        <p className="text-sm text-gray-500">Jan 2018 – Nov 2022 | Gurgaon</p>

        <ul>
          <li>
            Led{" "}
            <strong>checkout, payments, and order management platforms</strong>{" "}
            handling 25K+ RPM in high-traffic e-commerce environments
          </li>
          <li>
            Influenced product and system design for payments and post-order
            flows in collaboration with Product and Finance teams
          </li>
          <li>
            Designed and delivered a <strong>closed-wallet system</strong> for
            instant payments and refunds, integrating UPI and external wallet
            providers
          </li>
          <li>
            Built real-time <strong>refund and reconciliation systems</strong>,
            reducing settlement delays and improving financial accuracy
          </li>
          <li>
            Implemented secure payment gateway key management, strengthening
            compliance and security posture
          </li>
        </ul>

        <h3>
          Software Developer → Senior Developer → Technical Lead — Nagarro
        </h3>
        <p className="text-sm text-gray-500">Aug 2011 – Dec 2017 | Gurgaon</p>

        <ul>
          <li>
            Built scalable B2B e-commerce platforms, booking systems, and data
            pipelines across healthcare, gaming, and enterprise domains
          </li>
          <li>
            Partnered with stakeholders to translate business requirements into
            scalable technical designs
          </li>
          <li>
            Progressed from individual contributor to technical leadership,
            mentoring engineers and owning key system components
          </li>
        </ul>

        <hr />

        <h2>Education</h2>

        <p>
          <strong>Master of Computer Applications (MCA)</strong>
          <br />
          National Institute of Technology, Tiruchirappalli | 2008 – 2011
        </p>

        <hr />

        <h2>Skills & Expertise</h2>

        <h3>Leadership</h3>
        <ul>
          <li>Org design and team scaling (15+ engineers)</li>
          <li>Engineering strategy and execution</li>
          <li>Delivery predictability and Agile/Scrum</li>
          <li>Hiring, coaching, and stakeholder communication</li>
        </ul>

        <h3>Technical</h3>
        <ul>
          <li>Java, Spring Boot, AWS (EC2, S3, Lambda, RDS)</li>
          <li>Microservices, RESTful APIs, Kafka, MySQL</li>
          <li>Distributed systems, high-throughput transactional platforms</li>
        </ul>

        <h3>AI & Automation</h3>
        <ul>
          <li>AI-assisted development workflows</li>
          <li>Document intelligence and operational automation</li>
          <li>ML-based fraud detection and risk controls</li>
        </ul>

        <hr />

        <h2>Get in Touch</h2>

        <ul>
          <li>
            LinkedIn:{" "}
            <Link
              href="https://www.linkedin.com/in/ankul-choudhry"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/ankul-choudhry
            </Link>
          </li>
          <li>
            Email:{" "}
            <Link href="mailto:ankulnitt@gmail.com">ankulnitt@gmail.com</Link>
          </li>
          <li>
            GitHub:{" "}
            <Link
              href="https://github.com/ankul01"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/ankul01
            </Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
