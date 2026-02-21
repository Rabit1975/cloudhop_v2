$procs = Get-WmiObject Win32_Process | Where-Object { $_.Name -eq 'Code.exe' } |
  Select-Object ProcessId,
    @{N='MB'; E={ [math]::Round($_.WorkingSetSize / 1MB, 0) }},
    @{N='Type'; E={
      $cl = $_.CommandLine
      if ($cl -match 'extensionHost') { 'ExtHost' }
      elseif ($cl -match 'shared-process') { 'Shared' }
      elseif ($cl -match 'ptyHost') { 'PtyHost' }
      elseif ($cl -match 'fileWatcher') { 'FileWatcher' }
      elseif ($cl -match 'gpu-process') { 'GPU' }
      else { 'Other' }
    }} |
  Sort-Object MB -Descending

Write-Host "VS Code processes by memory:"
$procs | Format-Table -AutoSize

# Kill fileWatcher and GPU processes (safe to restart)
$safeToKill = $procs | Where-Object { $_.Type -in @('FileWatcher', 'GPU') }
foreach ($p in $safeToKill) {
  Write-Host "Killing PID $($p.ProcessId) [$($p.Type)] using $($p.MB) MB"
  Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
}

Write-Host "Done. Extension hosts and renderer left intact."
