type C = {
    username: string;
    token: string;
}

export default function C({ username, token }: C) {

    return (
        <h1>User settings page!
            {username}
            {token}
        </h1>
    );
};