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

New-Item -ItemType File -Path (Join-Path $outputDir ".nojekyll") -Force | Out-Null
