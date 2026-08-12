import { EXECUTIVE_TEAM } from "./people";

/**
 * One org-chart member. Edit `level` and `reportsTo` to place people.
 *
 * - `level` — row + card shade (1 = top). Independent of reporting.
 * - `reportsTo` — `id` of their direct higher-up (connector line). Omit / null for roots.
 * - `personId` — optional link into EXECUTIVE_TEAM for name/photo.
 */
export interface HierarchyMember {
  id: string;
  level: number;
  /** Direct higher-up member `id`. Leave empty for top of chart. */
  reportsTo?: string | null;
  personId?: string;
  /** Chart-only name when there is no personId. */
  name?: string;
  nameAr?: string;
  initials?: string;
  /** Optional title overrides (defaults from person role when personId is set). */
  title?: string;
  titleAr?: string;
}

export interface HierarchyLink {
  parentId: string;
  childId: string;
}

function roleOf(personId: string): { title: string; titleAr: string } {
  const person = EXECUTIVE_TEAM.find((p) => p.id === personId);
  return {
    title: person?.role ?? personId,
    titleAr: person?.roleAr ?? personId,
  };
}

function withRole(member: HierarchyMember): HierarchyMember {
  if (!member.personId) return member;
  const role = roleOf(member.personId);
  return {
    ...member,
    title: member.title ?? role.title,
    titleAr: member.titleAr ?? role.titleAr,
  };
}

/**
 * Flat org chart seed — customize each member's level and direct higher-up here.
 *
 * Example: move IB under CFO and to level 3:
 *   { id: "node-ib", personId: "ib", level: 3, reportsTo: "node-cfo" }
 */
export const CORPORATE_HIERARCHY_MEMBERS: HierarchyMember[] = [
  { id: "node-ceo", personId: "ceo", level: 1, reportsTo: null },
  { id: "node-evp-bd", personId: "evp-bd", level: 2, reportsTo: "node-ceo" },
  { id: "node-ham", personId: "ham", level: 2, reportsTo: "node-ceo" },
  { id: "node-cfo", personId: "cfo", level: 2, reportsTo: "node-ceo" },
  { id: "node-hwm", personId: "hwm", level: 3, reportsTo: "node-evp-bd" },
  {
    id: "node-compliance",
    personId: "compliance",
    level: 3,
    reportsTo: "node-ceo",
  },
  { id: "node-hop", personId: "hop", level: 3, reportsTo: "node-cfo" },
  {
    id: "node-risk",
    level: 3,
    reportsTo: "node-ceo",
    name: "Sara Al-Harbi",
    nameAr: "سارة الحربي",
    initials: "SH",
    title: "Head of Risk",
    titleAr: "رئيس إدارة المخاطر",
  },
  {
    id: "node-legal",
    level: 3,
    reportsTo: "node-cfo",
    name: "Omar Al-Qahtani",
    nameAr: "عمر القحطاني",
    initials: "OQ",
    title: "General Counsel",
    titleAr: "المستشار العام",
  },
  {
    id: "node-research",
    level: 3,
    reportsTo: "node-ham",
    name: "Layla Al-Mutairi",
    nameAr: "ليلى المطيري",
    initials: "LM",
    title: "Head of Research",
    titleAr: "رئيس البحوث",
  },
  { id: "node-ib", personId: "ib", level: 4, reportsTo: "node-evp-bd" },
].map(withRole);

/** Normalize + resolve titles for rendering. */
export function resolveHierarchyMembers(
  members: HierarchyMember[],
): HierarchyMember[] {
  const ids = new Set(members.map((m) => m.id));
  return members.map((raw) => {
    const member = withRole(raw);
    const level = Math.max(1, Math.floor(member.level) || 1);
    const reportsTo =
      member.reportsTo && ids.has(member.reportsTo) ? member.reportsTo : null;
    return { ...member, level, reportsTo };
  });
}

/** Group members into ascending level rows (document order preserved). */
export function groupMembersByLevel(
  members: HierarchyMember[],
): { level: number; members: HierarchyMember[] }[] {
  const resolved = resolveHierarchyMembers(members);
  const map = new Map<number, HierarchyMember[]>();

  for (const member of resolved) {
    const list = map.get(member.level) ?? [];
    list.push(member);
    map.set(member.level, list);
  }

  return [...map.entries()]
    .sort(([a], [b]) => a - b)
    .map(([level, row]) => ({ level, members: row }));
}

/** Parent → child edges from each member's `reportsTo`. */
export function collectMemberLinks(members: HierarchyMember[]): HierarchyLink[] {
  return resolveHierarchyMembers(members)
    .filter((m): m is HierarchyMember & { reportsTo: string } =>
      Boolean(m.reportsTo),
    )
    .map((m) => ({ parentId: m.reportsTo, childId: m.id }));
}
