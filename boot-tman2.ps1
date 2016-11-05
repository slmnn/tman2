
# START FRONTEND
$StartInfo = new-object System.Diagnostics.ProcessStartInfo
$StartInfo.FileName = "node"
$StartInfo.Arguments=".\node_modules\gulp\bin\gulp.js serve"
$StartInfo.LoadUserProfile = $false
$StartInfo.UseShellExecute = $false
$StartInfo.WorkingDirectory = (get-location).Path + "\frontend"
$proc = [System.Diagnostics.Process]::Start($StartInfo)

# START MONGO
$StartInfo = new-object System.Diagnostics.ProcessStartInfo
$StartInfo.FileName = "C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe"
$StartInfo.Arguments="--dbpath D:\mongo\data"
$StartInfo.LoadUserProfile = $false
$StartInfo.UseShellExecute = $false
$StartInfo.WorkingDirectory = "C:\Program Files\MongoDB\Server\3.0\bin"
$proc = [System.Diagnostics.Process]::Start($StartInfo)

# START BACKEND
$StartInfo = new-object System.Diagnostics.ProcessStartInfo
$StartInfo.FileName = "node"
$StartInfo.Arguments=".\node_modules\sails\bin\sails.js lift"
$StartInfo.LoadUserProfile = $false
$StartInfo.UseShellExecute = $false
$StartInfo.WorkingDirectory = (get-location).Path + "\backend"
$proc = [System.Diagnostics.Process]::Start($StartInfo)

# OPEN THE SITE
#System.Diagnostics.Process]::Start("http://localhost:3001")