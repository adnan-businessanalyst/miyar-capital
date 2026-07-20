import { PageHero } from "../components/PageHero";
import { Accordion, type AccordionItem } from "../components/Accordion";

const DISCLOSURES: AccordionItem[] = [
  {
    title:
      "Miyar Capital announces the availability of the quarterly statement for the Mudaraba Fund for the period ending 2024-12-31",
    body: "Miyar Capital has published the quarterly statement for the Mudaraba Fund covering the period ending 2024-12-31. The statement includes the fund's financial position, performance summary, and unit-price movement for the quarter. The full document is available for download below.",
    action: "View Attached File",
  },
  {
    title:
      "Miyar Capital announces the availability of the quarterly statement for the Mudaraba Fund for the period ending 2024-09-30",
    body: "Miyar Capital has published the quarterly statement for the Mudaraba Fund covering the period ending 2024-09-30. The statement includes the fund's financial position, performance summary, and unit-price movement for the quarter. The full document is available for download below.",
    action: "View Attached File",
  },
  {
    title:
      "Miyar Capital announces the availability of the quarterly statement for the Mudaraba Fund for the period ending 2024-06-30",
    body: "Miyar Capital has published the quarterly statement for the Mudaraba Fund covering the period ending 2024-06-30. The statement includes the fund's financial position, performance summary, and unit-price movement for the quarter. The full document is available for download below.",
    action: "View Attached File",
  },
];

export function Disclosures() {
  return (
    <div className="page">
      <PageHero title="Disclosures" crumb="Disclosures" />

      <section className="blk">
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <h2>Disclosures</h2>
          </div>
          <Accordion items={DISCLOSURES} />
        </div>
      </section>
    </div>
  );
}
