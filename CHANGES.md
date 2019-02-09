## Historia de cambios

### [v0.1.4]
- **core.org.voxsoftware.Lpr**: Protocolo de comunicación entre diferentes entornos y/o lenguajes
- **core.VW.Clr**: Ahora se reestructuró usando core.org.voxsoftware.Lpr


### [v0.1.3]

> Junio 1, 2016

- **System.Convert**: Se añade System.Convert.fromBase64String, System.Convert.toBase64String. Funcionan igual que en .NET
- **VW.Http.Request**: Correción bug propiedad UserAgent
- **System.IO.Fs**: Se añade versión de fs de nodejs, pero versión *sync* y *async*


### [v0.1.1]


> Mayo 27, 2016

- **vox-core-clr**: Versión 0.0.10. [Ver cambios](/submodules/vox-core-clr/CHANGES.md)

> Mayo 19, 2016

- **VW.Module**: Para su correcto funcionamiento en JxCore sobre plataformas móviles

> Mayo 18, 2016

- **VW.Ecma2015**: Correcciones en el parser de EcmaScript6: Bug al extender de una variable que viene de una expresión *import*
- **VW.Vcf**: Corrección. Bug al utilizar VW.Vcf
- **Dependencias**: Bug dependencia faltante *vox-install*
- **VW.PackageManager**: Bug, VW.PackageManager clase no existente
- **vox.project**: Se crea archivo vox.project, pensando en vox-platform, proyecto en camino
- **vox**: Ya no se ejecuta con jxcore sino con node

### [v0.1.1]

> Mayo 1, 2016

- **VW.Ecma2015.ClassPlugin**: Soporte para declaraciones con nombres computados
- **VW.Transpile**: Se añade nueva opción al CLI, para transpilar código ES6/async/await a ES5

> Abril 19, 2016

- **Microsoft.Win32.Registry**: Mejoras en el módulo teniendo en cuenta la actualización hecha a vox-core-clr
- **VW.Ecma2015.ModulePlugin**: Se hizo un bugfix temporal, teniendo en cuenta un bug encontrado en escodegen
- **VW.Ecma2015.ModulePlugin**: Se hizo correcciones sobre este módulo en la parte de exportar (export nameddeclarations)
- System.Globalization ya no usará VW.Vcf para leer la información de cada cultura. Ahora se usa System.Compression.ZipFile
- Se añadió System.Compression.ZipFile. Para usar esta clase revisar la documentación de https://github.com/cthackers/adm-zip
- **NOTICIA**: VW.Vcf puede ser removido en futuras versiones. Se notó que él módulo compressjs y lzma dependencias de VW.Vcf, demoran mucho tiempo en cargar
- Se cambió el nombre de vox-core-vcf a vox-core-compression
- Se cambió System.Globalization, debido a la inclusión de moment, se quitó la información de DateTimeInfo de cada cultura
- Se añadió moment.js y moment.timezones.js
- Se quitó System.DateTime, core.System.TimeZoneInfo y todo lo de vox-core-datetiem

> Abril 16, 2016

- Namespace System.IO. Se implementó los métodos: Stream.copyTo, Stream.copyToAsync, FileStream.setLength, MemoryStream.setLength
- Namespace System.IO. Se optimizó FileStream.length
- Namespace VW.Ecma2015. DestructuringAssignmentPlugin, se corrigió bug cuando una función de la forma *function({arg0})* manda un argumento nulo o `undefined`
- Corrección bug en VW.Vcf puesto que faltaba añadir el módulo LZMA


### [v0.1.0]
> Abril 6, 2016

- Cambios en submódulo vox-core-base de [v0.0.2 - v0.0.3](submodules/vox-core-base/CHANGES.md)
- Correciones menores en comando -self-register
- Ahora si se ejecuta vox sin parámetros muestra la ayuda
- Se mejoró visualmente el comando vox -help
- Cambios en submódulo vox-core-clr de [v0.0.2 - v0.0.3](submodules/vox-core-clr/CHANGES.md)

> Abril 5, 2016

- Inicio de [documentación](http://voxsoftware.github.io/vox-core/docs/vox-core/0.1.0)
- Creación de [página web](http://voxsoftware.github.io/vox-core/)
- Reorganización del código dividido en submódulos para permitir crear módulos nodejs que no dependan de vox-core



### [v0.0.1]
> Marzo 20, 2016

- Versión inicial de vox-core.
