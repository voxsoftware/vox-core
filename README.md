## vox-core


vox-core contains sub-modules that facilitate the programming of other modules. The most notable is the HTTP/HTTPS server included based on express, dynamic file loading, transpilation from EcmaScript 7 to EcmaScript 5 among others.

When I started to write *vox-core* I just started programming with node.js and my initial goal was to make a *copy* of some *.NET Framework* classes. However, this ceased to be a priority and in fact some modules that were thought of as a *copy* of *.NET* have been removed to favour standard *node.js* programming instead. 
Therefore the goal of vox-core at present is **to facilitate the development of other tools and/or modules** and to have a task-ready environment without installing many other modules.


The main usage of vox-core is as a dependency for the module [kowix](https://gitlab.com/voxsoftware/kowix/tree/v2.x)



### SPANISH
vox-core contiene unos submódulos que facilitan la programación en algunos aspectos. Lo más notable es el server HTTP/HTTPS incluido basado en express, carga dinámica de archivos, transpilación entre otros.

Cuando empecé a escribir *vox-core* recién iniciaba en la programación nodejs y su objetivo inicial fue **copiar** algunas clases *.NET Framework*. Sin embargo, esto dejó de ser prioridad  y de hecho algunos módulos que fueron pensados como una *copia* de *.NET*  han sido eliminados para favorecer en cambio una programación estándar *Node.js*. 
Por tanto el objetivo de vox-core actualmente es **facilitar desarrollo de otras herramientas** y tener un ambiente listo para ejecutar otras aplicaciones sin necesidad de un *npm install*


El principal uso de vox-core es como dependencia para el módulo [kowix](https://gitlab.com/voxsoftware/kowix/tree/v2.x)



### Submodules

* [vox-core-base](submodules/vox-core-base)
* [vox-core-basetypes](submodules/vox-core-basetypes)
* [vox-core-async](submodules/vox-core-async)
* [vox-core-e6html](submodules/vox-core-e6html)
* [vox-core-endoding](submodules/vox-core-encoding)
* [vox-core-es6](submodules/vox-core-es6)
* [vox-core-http](submodules/vox-core-http)
* [vox-core-io](submodules/vox-core-io)
* [vox-core-ipc](submodules/vox-core-ipc)
* [vox-core-runtime](submodules/vox-core-runtime)


### License
[MIT License](/LICENSE)
