# rain-stream-task

Provide your Mastodon login info in the `.env`:

``` shell
MASTODON_USER="email"
MASTODON_PASSWORD="password"
```

Potentially customize the following variables:

``` shell
MASTODON_CLIENT_SECRET="mastodon_clientcred.secret"
MASTODON_USER_SECRET="mastodon_usercred.secret"
MASTODON_MAX_ENTRIES=50
```

Run `docker compose up --build` to start the app.

