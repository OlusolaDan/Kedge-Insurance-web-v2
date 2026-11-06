# Rollback and Recovery Plan

Status: **PARTIALLY VERIFIED** — the procedure is prepared, but no production backup or restore drill has been performed.

## Trigger conditions

Rollback if clean routes fail, prerendered content is missing, assets return errors, forms lose submissions, HTTPS redirects loop, security headers break required resources, or a critical approved content error is discovered.

## Procedure

1. Record the incident, URL, timestamp, browser, response status and any cPanel/PHP log message without copying personal enquiry data into public logs.
2. Stop further uploads and preserve the new release directory for diagnosis.
3. Restore the previously backed-up document-root files and the previous `.htaccess` as a single consistent release. Preserve unrelated host files.
4. Restore the prior PHP endpoint and environment/mail configuration if those were changed as part of the release.
5. Clear applicable cPanel/Apache cache only through the host-supported process.
6. Re-run homepage, nested-route, asset, robots, sitemap and form smoke tests.
7. If rollback succeeds, keep the backup and failed release; do not delete either until the incident is closed.

## Recovery evidence

- Backup archive path and checksum: to be recorded by the deployer — **NOT IMPLEMENTED**.
- Previous release identifier: to be recorded before upload — **NOT IMPLEMENTED**.
- Restore drill: not performed — **BLOCKED** until a non-production/staging area is available.
- Mailbox recovery: host/provider confirmation required — **PARTIALLY VERIFIED**.
