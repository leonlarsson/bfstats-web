"use client";

import humanizeDuration from "humanize-duration";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Output } from "@/types";

const LastSentList = ({ outputs }: { outputs: Output[] }) => {

    const columns: ColumnsType<Output> = [
        {
            title: "Game",
            dataIndex: "game",
            filters: [...new Set(outputs.map(output => output.game))].map(game => ({ text: game, value: game })),
            onFilter: (value, record: Output) => record.game === value
        },
        {
            title: "Segment",
            dataIndex: "segment",
            filters: [...new Set(outputs.map(output => output.segment))].map(segment => ({ text: segment, value: segment })),
            onFilter: (value, record: Output) => record.segment === value
        },
        {
            title: "Language",
            dataIndex: "language",
            filters: [...new Set(outputs.map(output => output.language))].map(language => ({ text: language, value: language })),
            onFilter: (value, record: Output) => record.language === value
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (date: number) => <span suppressHydrationWarning>{new Date(date).toUTCString()} ({humanizeDuration(date - new Date().getTime(), { round: true })} ago)</span>
        }
    ];

    return (
        <Table
            className="mb-5"
            columns={columns}
            dataSource={outputs.sort((a, b) => b.date - a.date).map(output => ({ ...output, key: output.date }))}
            bordered
            scroll={{ x: true }}
            pagination={{ hideOnSinglePage: true }}
        />
    );
};

export default LastSentList;