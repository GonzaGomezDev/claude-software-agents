# software-team

Un equipo de agentes para Claude Code con el costo bajo control: **Tech Lead** (orquesta), **Dev Frontend**, **Dev Backend** y **QA**. El tamaño del equipo se ajusta al requerimiento y las tareas se sincronizan con **Jira**, **Notion** o un **board local**.

## Instalación

```bash
# desde GitHub
/plugin marketplace add <tu-usuario>/claude-software-agents
/plugin install software-team@software-team

# desarrollo local
claude --plugin-dir /ruta/a/claude-software-agents
```

## Uso

```bash
/team setup                      # una vez por proyecto: crea .team/config.md
/team agregar login con Google   # corre el equipo

# opcional: fija al Tech Lead en Opus con effort high para toda la sesión
claude --agent software-team:tech-lead
```

## Cómo ahorra tokens

| Palanca | Qué hace |
|---|---|
| El TL es la sesión principal | No hay una sesión extra de coordinador. Los subagentes no pueden anidar, así que el hub es el TL. |
| Sizing S/M/L | S: el TL lo resuelve solo. M: 1 dev + QA. L: front y back en paralelo + QA. |
| Briefs en disco | Cada dev recibe solo `.team/tasks/T<n>.md`, nunca la conversación. |
| `SendMessage` en los fixes | El dev que falló sigue con su contexto y no vuelve a leer el repo. |
| Reportes de ≤10 líneas | El contexto del TL no se infla. |
| Tools mínimas por agente | Menos schemas por llamada. QA no puede editar. |
| Modelos por rol | Los devs usan Sonnet (barato). QA usa Opus para la rigurosidad. |

## Config (`.team/config.md`)

| Clave | Default | Notas |
|---|---|---|
| `tracker` | `ask` | `jira`, `notion`, `chat` |
| `dev_split` | `auto` | `fullstack` (un dev, lo más barato), `front-back` (siempre separa), `auto` (separa solo en L) |
| `dev_model` / `dev_effort` | `sonnet` / `high` | `inherit` (el modelo de tu sesión), `opus`, `sonnet` o `haiku`, según tu plan. `/team setup` te lo pregunta |
| `qa_model` / `qa_effort` | `opus` / `medium` | mismas opciones. Con `sonnet`, conviene effort `high` |
| `max_fix_rounds` | `3` | rondas de QA→fix antes de escalarte |

**¿Separar front y back sale más caro?** Tener dos especialistas no cuesta más que uno solo. El extra viene de que cada dev explora el repo por su cuenta y del contrato API entre ellos. A cambio ganás paralelismo y briefs más enfocados. Para medirlo, corré el mismo requerimiento con `fullstack` y con `front-back` y compará con `/cost`.

## Flujo

```
/team <req> → TL: config → tracker → sizing → plan + briefs + contrato API
            → devs (en paralelo si es L) → QA (Opus) → FAIL? SendMessage al mismo dev → QA otra vez
            → PASS → tracker Done → reporte
```

## Limitaciones

- Los devs no se hablan entre sí: el TL lleva el contrato API de uno al otro.
- Si dos briefs tocan los mismos archivos, el TL usa worktrees y mergea antes de QA.
- Con `/team` en una sesión normal, el modelo del TL es el de esa sesión. Para fijarlo, usá `--agent software-team:tech-lead`.
