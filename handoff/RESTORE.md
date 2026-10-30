# Encrypted setup handoff

private-local-config.tar.gz.enc contains local API/storage credentials, Vercel linkage and saved development records, encrypted with AES-256-GCM. It is not plaintext public configuration.

Get Strikeout.restore-key.txt privately from the owner. From the repository root run:

    node scripts/restore-workspace.mjs /path/to/Strikeout.restore-key.txt restored-local-config
    tar -xzf restored-local-config/private-local-config.tar.gz -C restored-local-config

Use a new directory. The script verifies SHA-256 and authenticates the archive before reporting success. Do not publish the key or restore historical records over work you need.

The complete original workspace is also preserved in the encrypted full-workspace.part-*.enc files in this folder. They contain all local files at capture time, including the legacy implementation, installed dependencies, generated builds, QA screenshots, resources, inspiration and presentation material. The total encrypted archive is 214,841,157 bytes. The parts and combined archive have SHA-256 checksums in full-workspace.manifest.json.

To verify the parts, reconstruct and decrypt the full archive from a clone:

    node scripts/restore-workspace.mjs /path/to/Strikeout.restore-key.txt restored-full-workspace handoff/full-workspace.manifest.json
    tar -xzf restored-full-workspace/full-workspace.tar.gz -C restored-full-workspace

Use a fresh output directory. The extracted mu20/strikeout-final folder is the captured current implementation, and mu20/strikeout is the legacy implementation. Ordinary development uses the current source at the repository root; restoring the full archive is optional. Runtime changes after capture and every live production Blob record are outside this filesystem snapshot. New handoff scripts and documentation are available at the repository root.

The owner also has the original combined encrypted archive and restore key at C:/Users/Yash/.codex/handoffs/Strikeout-20261030/. Never commit the key. The handoff folder is excluded from Vercel deployments so the historical archive does not become part of the web application.
