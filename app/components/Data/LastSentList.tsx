"use client";

import humanizeDuration from "humanize-duration";
import { Table } from "antd";
import { Outputs } from "./Charts";

const LastSentList = ({ outputs }: { outputs: Outputs }) => {

    const columns = [
        {
            title: "Game",
            dataIndex: "game"
        },
        {
            title: "Segment",
            dataIndex: "segment"
        },
        {
            title: "Language",
            dataIndex: "language"
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (date: number) => `${new Date(date).toUTCString()} (${humanizeDuration(date - new Date().getTime(), { round: true })} ago)`
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={outputs.sort((a, b) => b.date - a.date)}
            bordered
            scroll={{ x: true }}
            pagination={{ hideOnSinglePage: true }}
        />
    );
};

export default LastSentList;