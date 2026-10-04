# Security

This package formats supplied values locally and makes no network requests.
Treat input as untrusted. The typed grouping API expects the documented input
shape; it is not an arbitrary JSON validator. Output strings are plain text,
not sanitized HTML. Use textContent or your framework's text escaping.

After public publication, report vulnerabilities using GitHub's private vulnerability
reporting feature if enabled. Do not disclose credentials or customer data in issues.
If private reporting is unavailable, open an issue requesting a private contact
without describing exploit details. Version 0.1.x is the initial support target.
