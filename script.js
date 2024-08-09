document.addEventListener("DOMContentLoaded", function() {
    const diagnosticList = document.getElementById("diagnostic-list");
    const filterInput = document.getElementById("searchInput");
    const clearFilterIcon = document.getElementById("clearInput");

    // Estructura de datos para los diagnósticos y actividades
    const diagnostics = [
        {
            code: "C01",
            description: "Supervisión del uso de drogas anticonceptivas",
            activities: [
                "Control regulación fecundidad",
                "Consejería individual sobre regulación de fertilidad"
            ],
            form: "Regulación de Fecundidad (Paternidad Responsable)"
        },
        {
            code: "Z00.3",
            description: "Examen del estado de desarrollo del adolescente",
            activities: [
                "Control de salud integral de adolescentes programado 'Joven Sano' en establecimientos educacionales (si fue en CESFAM)",
                "Control de salud integral de adolescentes programado 'Joven Sano' en otros espacios del establecimiento de salud (si fue en colegio)",
                "Control regulación de fecundidad (si se inicia MAC)",
                "Crisis normativa",
                "Consejería: salud sexual y reproductiva, tabaquismo, alimentación saludable, actividad física, regulación de fertilidad, otras áreas",
                "Intervención: AG_Intervención Mínima (Bajoriesgo), AG_Intervención Breve"
            ],
            form: "Ficha salud integral adolescente (CLAP modificada) Llenar todo, Vigencia: primer día del mes del próximo año"
        },
        {
            code: "Z02",
            description: "Exámenes y contactos para fines administrativos",
            activities: [
                "Ingreso resultado mamografía",
                "Ingreso resultado ecotomografía mamaria",
                "Solicitud de eco mamaria c/convenio (o sin, según corresponda)"
            ],
            form: "PAP/MAMAS. Editar solo la parte de mamografía y eco mamaria si corresponde en resultado. Copiar toda la parte de hallazgos e impresiones. Vigencia: BIRADS 1 y 2 es de 3 años; BIRADS 0 y 3 es de un año."
        },
        {
            code: "C02",
            description: "Examen y atención del postparto",
            activities: [
                "Control puérpera y recién nacido hasta 10 días de vida (con o sin acompañante)",
                "Crisis normativa",
                "Control post parto",
                "Edimburgo"
            ],
            form: "Control de la mujer puérpera - Escala de depresión embarazo o postnatal de Edimburgo. Examen físico general."
        },
        {
            code: "C03",
            description: "Control de salud de rutina del niño",
            activities: [
                "Control de salud con o sin acompañante"
            ],
            form: "Antecedentes de ingreso recién nacido - Score riesgo IRA"
        },
        {
            code: "C04",
            description: "Examen de pesquisa especial para tumor de cuello uterino (nuevo y sospecha o confirmado y repetido)",
            activities: [],
            form: "Seguimiento PAP/MAMAS. Editar solo la parte de PAP y en observaciones anotar ej: PLACA: NMO N1788 iniciales nombre y dos apellidos y número de la placa. Llenar hoja de PAP."
        },
        {
            code: "C05",
            description: "Examen ginecológico general de rutina",
            activities: [
                "Control ginecológico",
                "Consejerías individuales salud sexual y reproductiva"
            ],
            form: "Seguimiento PAP/MAMAS. Llenar parte de examen físico de mamas, mamografía y ecografía si es que le haces la orden de examen y la parte de PAP si es que lo tomas. Regulación de fecundidad si es que extiendes receta de anticonceptivos o cambias de método o ingresas a método."
        },
        {
            code: "C06",
            description: "DEPENDE DEL ANTICONCEPTIVO QUE SE DEJE",
            activities: [
                "Control regulación fecundidad",
                "Consejerías individuales regulación de fertilidad"
            ],
            form: "Regulación de fecundidad (paternidad responsable) si es que extiendes receta de anticonceptivos o cambias de método o ingresas a método. - Seguimiento PAP/MAMAS. Examen físico general."
        },
        {
            code: "C07",
            description: "Embarazo confirmado (nuevo y confirmado)",
            activities: [
                "Control prenatal (con o sin acompañante)",
                "Examen de mamas nuevo o repetido",
                "Crisis normativa",
                "Consejerías individuales alimentación saludable",
                "Consejerías individuales prevención de la transmisión vertical del VIH (pre-test)",
                "Entrega de guías anticipatorias (si es que hay stock)",
                "Intervención mínima o breve según resultado del AUDIT"
            ],
            form: "Gestante y puérpera, llenar lo que más se pueda. Edimburgo el puntaje se calcula solo, anotarlo en la anamnesis una vez terminado. RFAM registro de salud familiar occidente, llenar todo. EPSA escala breve de evaluación riesgo psicosocial, si tiene algún riesgo o ninguno hay que anotarlo en la anamnesis. AUDIT. Seguimiento PAP/MAMAS y llenar solo la parte de examen físico de mamas. Si no tiene el PAP al día, aprovechar de tomarlo y registrarlo en el mismo formulario. Examen físico general."
        },
        {
            code: "C08",
            description: "Supervisión de embarazo normal / alto riesgo",
            activities: [
                "Control prenatal (acompañada si es que lo está)",
                "Consejería individuales Prevención De la Transmisión Vertical Del VIH (Embarazadas) Post Test (si es que se hizo el test)"
            ],
            form: "Gestante y puérpera, llenar sólo la parte de resultados control prenatal. Edimburgo en segundo control si es que en el primero tuvo puntaje ≥13. Examen físico general."
        },
        {
            code: "C09",
            description: "Estados menopáusicos y climatericos femeninos",
            activities: [
                "Control climaterio",
                "Crisis normativa"
            ],
            form: "MRS - Examen físico general."
        },
        {
            code: "C10",
            description: "Presencia de implantes endocrinos",
            activities: [
                "Educación ",
                "Abs Sexual o uso estricto de PSV por 7 días",
                "PSV de prevención de ITS",
                "Mantener zona seca x 3 días"
            ],
            form: "Regulación de fecundidad (Paternidad responsable) Examen fisico general"
        }
    ];

    // Agregar los diagnósticos a la tabla
    diagnostics.forEach(diagnostic => {
        const diagnosticRow = document.createElement("tr");
        diagnosticRow.innerHTML = `
            <td>${diagnostic.code}</td>
            <td>${diagnostic.description}</td>
            <td>${diagnostic.form}</td>
            <td><button class="toggle-activities">Mostrar Actividades</button></td>
        `;

        const activitiesRow = document.createElement("tr");
        activitiesRow.className = "activities";
        activitiesRow.innerHTML = `
            <td colspan="4">
                <ul>
                    ${diagnostic.activities.length > 0 ? diagnostic.activities.map(activity => `<li>${activity}</li>`).join("") : "<li>No hay actividades</li>"}
                </ul>
            </td>
        `;

        diagnosticList.appendChild(diagnosticRow);
        diagnosticList.appendChild(activitiesRow);

        // Evento para mostrar/ocultar actividades
        diagnosticRow.querySelector(".toggle-activities").addEventListener("click", () => {
            activitiesRow.classList.toggle("show");
            const button = diagnosticRow.querySelector(".toggle-activities");
            button.textContent = activitiesRow.classList.contains("show") ? "Ocultar Actividades" : "Mostrar Actividades";
        });
    });

    

    // Filtrar diagnósticos
    filterInput.addEventListener("input", function() {
        const filterValue = filterInput.value.toLowerCase();
        const rows = diagnosticList.getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            const diagnosticDescription = rows[i].cells[1]?.textContent.toLowerCase();
            if (diagnosticDescription) {
                rows[i].style.display = diagnosticDescription.includes(filterValue) ? "" : "none";
            }
        }

        // Mostrar u ocultar el ícono de borrar
        clearFilterIcon.style.display = filterValue ? "block" : "none";
    });

        // Borrar filtro al hacer clic en el ícono
        clearFilterIcon.addEventListener("click", function() {
            filterInput.value = ""; // Limpiar el campo de entrada
            const rows = diagnosticList.getElementsByTagName("tr");
    
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = ""; // Mostrar todas las filas
            }
    
            clearFilterIcon.style.display = "none"; // Ocultar el ícono
        });

    



    // Inicializar la tabla con todos los diagnósticos
    renderDiagnostics(diagnostics);

    
});


