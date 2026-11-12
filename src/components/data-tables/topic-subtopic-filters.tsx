"use client"

import type { Row, Table } from "@tanstack/react-table"

import { DataTableFacetedFilter } from "@/components/data-tables/data-table-faceted-filter"

interface TopicSubtopicFiltersProps<TData> {
    table: Table<TData>
}

/**
 * Row filter used by the topic / sub topic faceted filters. Supports
 * multi-select (array filter values) and tolerates null/undefined row values
 * by normalizing them to an empty string.
 */
export function textFilterFn<TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: unknown
): boolean {
    if (!Array.isArray(filterValue) || filterValue.length === 0) return true
    const raw = row.getValue(columnId)
    const strValue = raw === null || raw === undefined ? "" : String(raw)
    return filterValue.map(String).includes(strValue)
}

/**
 * Extracts sorted faceted-filter options from a column's faceted unique
 * values. Rows without a value (null / undefined / empty) are grouped under a
 * single trailing "Not Available" option so admins can also isolate untagged
 * questions.
 */
function buildTextFilterOptions(
    facets: Map<unknown, number> | undefined
): { label: string; value: string }[] {
    if (!facets) return []
    const options: { label: string; value: string }[] = []
    let hasEmpty = false
    for (const rawKey of Array.from(facets.keys())) {
        const strValue =
            rawKey === null || rawKey === undefined ? "" : String(rawKey)
        if (strValue.trim() === "") {
            hasEmpty = true
            continue
        }
        options.push({ label: strValue, value: strValue })
    }
    options.sort((a, b) => a.label.localeCompare(b.label))
    if (hasEmpty) {
        options.push({ label: "Not Available", value: "" })
    }
    return options
}

/**
 * Topic / Sub Topic faceted filters shared by all admin question tables
 * (question groups, assessments, modules, MCQs and their add-pickers).
 *
 * Options are derived from the table's own data, so each table only lists the
 * topics/subtopics that actually appear in its rows — no props needed. The
 * columns are expected to be registered under the "topic" and "subtopic"
 * accessor keys (with `textFilterFn` as their filterFn); a filter is only
 * rendered when the column exists and has at least one value.
 */
export function TopicSubtopicFilters<TData>({
    table,
}: TopicSubtopicFiltersProps<TData>) {
    const topicColumn = table.getColumn("topic")
    const subtopicColumn = table.getColumn("subtopic")

    if (!topicColumn && !subtopicColumn) return null

    const topicOptions = buildTextFilterOptions(
        topicColumn?.getFacetedUniqueValues() as Map<unknown, number> | undefined
    )
    const subtopicOptions = buildTextFilterOptions(
        subtopicColumn?.getFacetedUniqueValues() as
            | Map<unknown, number>
            | undefined
    )

    return (
        <>
            {topicColumn && topicOptions.length > 0 && (
                <DataTableFacetedFilter
                    column={topicColumn}
                    title="Topic"
                    options={topicOptions}
                />
            )}
            {subtopicColumn && subtopicOptions.length > 0 && (
                <DataTableFacetedFilter
                    column={subtopicColumn}
                    title="Sub Topic"
                    options={subtopicOptions}
                />
            )}
        </>
    )
}

export default TopicSubtopicFilters
