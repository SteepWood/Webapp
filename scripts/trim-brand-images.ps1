Add-Type -AssemblyName System.Drawing

function Trim-Image {
  param(
    [string]$Path,
    [string]$OutPath,
    [int]$Threshold = 250
  )

  $bmp = [System.Drawing.Bitmap]::FromFile($Path)
  $minX = $bmp.Width
  $minY = $bmp.Height
  $maxX = 0
  $maxY = 0

  for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
      $p = $bmp.GetPixel($x, $y)
      if ($p.A -gt 10 -and ($p.R -lt $Threshold -or $p.G -lt $Threshold -or $p.B -lt $Threshold)) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  $pad = 16
  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($bmp.Width - 1, $maxX + $pad)
  $maxY = [Math]::Min($bmp.Height - 1, $maxY + $pad)
  $w = $maxX - $minX + 1
  $h = $maxY - $minY + 1

  $crop = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($crop)
  $src = New-Object System.Drawing.Rectangle $minX, $minY, $w, $h
  $dest = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $g.DrawImage($bmp, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $bmp.Dispose()
  $crop.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()

  return @{ Width = $w; Height = $h }
}

$root = Join-Path $PSScriptRoot "..\public\brand"
$logo = Trim-Image (Join-Path $root "steepwood-logo.png") (Join-Path $root "steepwood-logo-trimmed.png")
$fav = Trim-Image (Join-Path $root "steepwood-favicon.png") (Join-Path $root "steepwood-favicon-trimmed.png")

Write-Output "logo: $($logo.Width)x$($logo.Height)"
Write-Output "favicon: $($fav.Width)x$($fav.Height)"
