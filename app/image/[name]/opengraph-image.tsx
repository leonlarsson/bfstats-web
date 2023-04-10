import { ImageResponse } from 'next/server';

export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default async ({ params: { name } }: { params: { name: string } }) => {

    try {
        const res = await fetch(`https://api.gametools.network/bf2042/stats/?format_values=false&name=${encodeURIComponent(name)}&platform=pc`);
        const data = await res.json();

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        fontSize: 32,
                        fontWeight: 600
                    }}
                >
                    <div>{data.userName}</div>
                    <div style={{ marginTop: 10 }}>{data.kills} kills</div>
                </div>

            ),
            {
                width: 1200,
                height: 600
            }
        );
    } catch (error) {
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        fontSize: 32,
                        fontWeight: 600
                    }}
                >
                    <div style={{ color: "red" }}>Error fetching</div>
                </div>

            ),
            {
                width: 1200,
                height: 600
            }
        );
    }
};