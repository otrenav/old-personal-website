+++
title = "Cybersecurity for small businesses"
date = "1990-03-29"
draft = true
tags = [
    "Security",
    "Small Business",
    "Startups"
]
+++

- TODO: https://elusivemoose.com/2017/06/cybersecurity-small-business/

# Cybersecurity for Small Business

By Cristos Lianides-Chin Jun 13,2017 0 Going to work for yourself can be a
hugely liberating experience. When I first made the shift, I came to fully
appreciate the empowering distinction between the question, “Is it OK if I take
Friday off”, and the statement, “I’m not available Friday”.

But for every question that boosted my confidence, there was at least one
causing a new worry. As a programmer, one of the biggest was, “What if I’m the
victim of a data breach?” A recent report sponsored by IBM indicates that the
typical breach can cost companies as much as $4 million per incident. Even
worse, they estimate that 1 out of every 4 companies worldwide is likely to
experience some kind of breach in 2017.

Fortunately, it doesn’t take a lot of work or money to improve your odds. At
Anchor-Buoy Software, I’ve found spending a little time setting up good security
practices buys a huge amount of peace-of-mind.

What kind of data breaches should I worry about?

There were two main types of security breaches that we were concerned with:

Someone stealing data from a system and sharing or selling it. Someone stopping
me from accessing my own (or a client’s) data. Although the Ponemon Institute
report looks most closely at the first kind of data breach, where confidential
records are stolen and re-sold, they do note that “The biggest financial
consequence to organizations that experienced a data breach is lost business.
Following a data breach, organizations need to take steps to retain customers’
trust to reduce the long-term financial impact.”

Both situations — having data stolen or just losing access to it — would erode
clients’ trust in us, which is our most valuable asset. A good plan needs to
provide protection from both scenarios.

Protecting Client Files

While methods vary for protecting client data in custom applications, there are
a few generic practices that I would recommend to everyone.

Use whole-disk encryption. There are powerful encryption suites built into every
modern computer which will make it significantly harder (if not practically
impossible) for an attacker to access data if they steal your computer. On a
Mac, you can enable FileVault, or in Windows, just turn on BitLocker. Use secure
communication. I don’t like to send client data via email. Instead, I’ll create
a strongly-encrypted zip file and then share it using a private system like
Slack, Semaphor, or SendInc. Using this kind of layered protection means that
even if someone gains illicit access to your private account, the zip archive
will still be protected. Keep whole-disk, encrypted backups. You should have an
on-site backup for quick restores [Mac: Time Machine] [Win: File History] in
case something fries your entire computer. Ideally, this should be on a hard
drive big enough to keep several days’ worth of backups, which will help if
you’re the victim of ransomware. You should also have an off-site backup with at
least one provider like BackBlaze or Crashplan, in case some kind of disaster
destroys your computer and backup hard drive at the same time. Protecting
Passwords and Accounts

Use a password manager. After evaluating a couple, I settled on LastPass mostly
because it uses layered encryption — your passwords are encrypted before they
get sent to LastPass’ servers, so even if someone were to hack LP itself, they
still wouldn’t have access to your data. Many products in this space have
similar security (such as Encryptr and Dashlane) so feel free to try a couple to
find the right fit.

Turn on Two-Factor Authentication. Also known as “TFA” or “2FA”, many services
(like Gmail) have a feature that requires both a password and a one-time code,
usually sent to you via text message every time you log in. With 2FA enabled,
it’s impossible for an attacker to access your accounts if they only have your
password — and most people will notice pretty quickly if their phone goes
missing.

Consider Insurance

While it’s not for everyone, some Errors & Omissions insurance plans (a.k.a.
“Professional Liability Insurance”) include riders for data breach coverage. If
you’re working in an especially sensitive industry and aren’t already required
to have this kind of insurance, you might want to talk to a friendly local
insurance agent and get a quote. You can also get quotes online from providers
like Hiscox.

---

Think we missed something? Come up with a better answer to one of these
problems? Let us know in the comments!
