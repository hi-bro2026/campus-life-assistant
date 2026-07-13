$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $projectRoot "_site"

if (Test-Path -LiteralPath $outputDir) {
    Remove-Item -LiteralPath $outputDir -Recurse -Force
}

New-Item -ItemType Directory -Path $outputDir | Out-Null

Get-ChildItem -Path $projectRoot -Filter "*.html" -File |
    Copy-Item -Destination $outputDir

$staticDirectories = @("css", "js", "images", "downloads")
foreach ($directory in $staticDirectories) {
    $source = Join-Path $projectRoot $directory
    if (Test-Path -LiteralPath $source) {
        Copy-Item -LiteralPath $source -Destination $outputDir -Recurse
    }
}

# Replace the Vercel tracker ID in static HTML with the GitHub Pages tracker ID.
Get-ChildItem -LiteralPath $outputDir -Filter "*.html" -File | ForEach-Object {
    $html = [System.IO.File]::ReadAllText($_.FullName)
    $html = $html.Replace("f67ebd9214762a03eb385469db21aeee", "de7ae9746bc302a3c494d385796bbbfb")
    [System.IO.File]::WriteAllText($_.FullName, $html, [System.Text.UTF8Encoding]::new($false))
}

# Baidu analytics ID for GitHub Pages is injected during the static build.
New-Item -ItemType File -Path (Join-Path $outputDir ".nojekyll") -Force | Out-Null
