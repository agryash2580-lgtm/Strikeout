# Encrypted setup handoff

private-local-config.tar.gz.enc contains local API/storage credentials, Vercel linkage and saved development records, encrypted with AES-256-GCM. It is not plaintext public configuration.

Get Strikeout.restore-key.txt privately from the owner. From the repository root run:

    node scripts/restore-workspace.mjs /path/to/Strikeout.restore-key.txt restored-local-config
    tar -xzf restored-local-config/private-local-config.tar.gz -C restored-local-config

Use a new directory. The script verifies SHA-256 and authenticates the archive before reporting success. Do not publish the key or restore historical records over work you need.

The complete original 205 MB workspace backup is LOCAL, not fully uploaded: C:/Users/Yash/.codex/handoffs/Strikeout-20261030/full-workspace.tar.gz.enc. The key is in the same local folder. Its metadata is full-workspace.manifest.json. To restore that local original, pass the original manifest as the third argument:

    node scripts/restore-workspace.mjs /path/to/key.txt restored-full-workspace C:/Users/Yash/.codex/handoffs/Strikeout-20261030/manifest.json

Then extract restored-full-workspace/full-workspace.tar.gz. The full backup includes legacy versions, dependencies, generated builds, references and all local workspace files at capture time. It is not an export of every live production Blob record.
