const Test = ({ params: { name } }: { params: { name: string } }) => {
    return (
        <div>Hello, {name}</div>
    );
};

export default Test;