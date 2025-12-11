import fs from "fs";
import path from "path";

// === Konfigurasi Path ===
const SOURCE_DIR = path.resolve("./");                // direktori asal (project ini)
const DEST_DIR = path.resolve("../Insure-Chain/packages/mobile"); // ubah ke directory tujuan

// Ambil daftar ignore dari .gitignore
function getGitignoreList() {
    const gitignorePath = path.join(SOURCE_DIR, ".gitignore");
    if (!fs.existsSync(gitignorePath)) return [];

    const patterns = fs
        .readFileSync(gitignorePath, "utf-8")
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p !== "" && !p.startsWith("#"));

    return patterns;
}

// Cek apakah path termasuk file ignore
function isIgnored(filePath, ignoreList) {
    return ignoreList.some((pattern) =>
        filePath.includes(pattern.replace(/\/$/, ""))
    );
}

// Rekursif copy file
function copyRecursive(src, dest, ignoreList) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (isIgnored(srcPath, ignoreList)) continue;

        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath, ignoreList);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// === Eksekusi copy ===
function run() {
    const ignoreList = getGitignoreList();
    console.log("Ignored:", ignoreList);

    if (fs.existsSync(DEST_DIR)) {
        fs.rmSync(DEST_DIR, { recursive: true, force: true });
    }
    if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

    copyRecursive(SOURCE_DIR, DEST_DIR, ignoreList);

    console.log(`\n📁 Semua file berhasil disalin ke: ${ DEST_DIR }`);
}

run();