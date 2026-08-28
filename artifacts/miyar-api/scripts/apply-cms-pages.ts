import postgres from "postgres";
import { requireDatabaseUrl } from "./dbUrl.ts";

const url = requireDatabaseUrl();
const sql = postgres(url, { max: 1 });

try {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      parent_id uuid,
      parent_path varchar(400),
      slug varchar(80) NOT NULL,
      path varchar(400) NOT NULL UNIQUE,
      title_en varchar(300) NOT NULL,
      title_ar varchar(300) DEFAULT '' NOT NULL,
      published boolean DEFAULT false NOT NULL,
      nav_show boolean DEFAULT false NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL
    )
  `;
  await sql`ALTER TABLE cms_pages ADD COLUMN IF NOT EXISTS parent_path varchar(400)`;
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'cms_pages_parent_id_fkey'
      ) THEN
        ALTER TABLE cms_pages
          ADD CONSTRAINT cms_pages_parent_id_fkey
          FOREIGN KEY (parent_id) REFERENCES cms_pages(id) ON DELETE CASCADE;
      END IF;
    END $$
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_page_blocks (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      page_id uuid NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
      sort integer DEFAULT 0 NOT NULL,
      type varchar(40) NOT NULL,
      props jsonb DEFAULT '{}'::jsonb NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL
    )
  `;

  const existing = await sql`SELECT id FROM cms_pages WHERE path = '/cms-showcase' LIMIT 1`;
  if (existing.length === 0) {
    const [parent] = await sql`
      INSERT INTO cms_pages (slug, path, title_en, title_ar, published, nav_show)
      VALUES ('cms-showcase', '/cms-showcase', 'CMS Showcase', 'عرض المحتوى', false, false)
      RETURNING id
    `;
    const [child] = await sql`
      INSERT INTO cms_pages (parent_id, slug, path, title_en, title_ar, published, nav_show)
      VALUES (
        ${parent.id},
        'demo',
        '/cms-showcase/demo',
        'Demo page',
        'صفحة تجريبية',
        false,
        false
      )
      RETURNING id
    `;

    const blocks = [
      {
        type: "hero",
        sort: 0,
        props: {
          design: { bg: "none" },
          titleEn: "Demo page",
          titleAr: "صفحة تجريبية",
          crumbEn: "CMS Showcase",
          crumbAr: "عرض المحتوى",
        },
      },
      {
        type: "band",
        sort: 1,
        props: {
          design: {
            bg: "image",
            image: "/media/content/family-office-intro.jpg",
            imagePosition: "center",
            overlay: true,
            glass: false,
          },
          headingEn: "A modern section band",
          headingAr: "شريط قسم حديث",
          bodyEn: "Image background with a navy overlay. This design lives only on CMS pages.",
          bodyAr: "خلفية صورة مع تراكب كحلي. هذا التصميم مقتصر على صفحات نظام المحتوى.",
        },
      },
      {
        type: "cards",
        sort: 2,
        props: {
          design: { bg: "solid", solid: "navy", glass: true },
          headingEn: "Glass cards",
          headingAr: "بطاقات زجاجية",
          items: [
            {
              titleEn: "Discretionary",
              titleAr: "تقديري",
              bodyEn: "Portfolios built around a clear mandate.",
              bodyAr: "محافظ تُبنى حول تفويض واضح.",
            },
            {
              titleEn: "Liquidity",
              titleAr: "السيولة",
              bodyEn: "Short-term solutions with institutional care.",
              bodyAr: "حلول قصيرة الأجل بعناية مؤسسية.",
            },
          ],
        },
      },
      {
        type: "steps",
        sort: 3,
        props: {
          design: { bg: "solid", solid: "navy-mid", glass: true },
          headingEn: "How we work",
          headingAr: "كيف نعمل",
          items: [
            {
              num: "01",
              titleEn: "Listen",
              titleAr: "نستمع",
              bodyEn: "Understand the mandate and constraints.",
              bodyAr: "فهم التفويض والقيود.",
            },
            {
              num: "02",
              titleEn: "Structure",
              titleAr: "نُهيكِل",
              bodyEn: "Shape the solution around that brief.",
              bodyAr: "تشكيل الحل حول هذا الموجز.",
            },
          ],
        },
      },
      {
        type: "register",
        sort: 4,
        props: {
          design: { bg: "none" },
          titleEn: "Register interest",
          titleAr: "سجّل اهتمامك",
          bodyEn: "Tell us about your mandate — our team will follow up.",
          bodyAr: "أخبرنا عن تفويضك — سيتابع فريقنا.",
        },
      },
    ];

    for (const block of blocks) {
      await sql`
        INSERT INTO cms_page_blocks (page_id, sort, type, props)
        VALUES (${child.id}, ${block.sort}, ${block.type}, ${sql.json(block.props)})
      `;
    }
    console.log("cms_pages: seeded /cms-showcase and /cms-showcase/demo (unpublished)");
  } else {
    console.log("cms_pages: tables ok (showcase already present)");
  }
} finally {
  await sql.end({ timeout: 5 });
}
