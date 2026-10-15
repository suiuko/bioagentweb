# BioAgent project website

Static project page for **BioAgent: Self-Directed Skill Acquisition and Capability Growth for Long-Horizon Biological Experiments**.

## Edit and preview

Edit `index.html` for the descriptions, architecture, evaluation results, and media markup. Styles are in `assets/site.css`; `assets/site.js` adds video chapter navigation and background playback controls. No package installation or build step is required.

```sh
python3 scripts/preview.py
```

Open <http://127.0.0.1:8765>. The preview server supports byte-range requests so video seeking works before a full download completes. All fonts, videos, posters, and captions are served locally. The text and native video controls remain available without JavaScript. Deployment serves the repository root, including `assets/`, at either `/` or a GitHub Pages project subpath.

## Content and media sources

The October 2026 refresh follows the author's `Bioagent_RAL.pdf` manuscript, the BioAgent source at commit `9b69394798a918caa1613e86166490368db5f29a`, and the reviewed v4 five-minute film. An earlier Markdown manuscript in the code repository describes three protocols and contains unfinished results; that draft is not the source for this page's task scope or numbers.

- **Overview:** `BioAgent_submission_v4_5min_1080p.mp4` from the author's `视频制作/bioagent_video/output_v4/`, copied unchanged to `assets/bioagent-overview.mp4` (300 seconds, 1920 × 1080, H.264/AAC).
- **Teaching sequence:** seconds 200–224 of that overview, showing the capability gap, targeted demonstration, offline update, and independent aspiration. It is an edited demonstration of the lifecycle, not a claim that training finishes within 24 seconds.
- **Background:** source seconds 125–185 of `demo_task_1.mp4`, accelerated 5×, resized to 720p, and exported without audio.
- **Captions:** the author's v4 English subtitles, converted from SRT to WebVTT; teaching captions are shifted to the clip's local timeline. English narration in the source film is synthesized with the Kokoro `af_heart` voice.
- **Posters:** frames extracted from the supplied videos. The teaching footage retains the source film's face mosaic.

The chapter buttons select actual times in the overview. They do not simulate robot progress or success. Gallery cards link to Task 1 at 00:44 and Task 2 at 03:44.

## Evaluation wording

Manuscript Tables II–III distinguish:

- 25 distinct atomic skills, 50 trials per skill with recovery disabled; success rates 84–100%, with 17 skills at 50/50.
- Task 1: 20 invocations of 20 distinct skills; 27/50 (54%) without recovery and 33/50 (66%) with recovery.
- Task 2: 31 invocations of 24 distinct skills; 20/50 (40%) without recovery and 29/50 (58%) with recovery.
- The two protocols share 19 skills. Complete-task evaluations have 50 runs per task and recovery condition; all formal evaluations prohibit human intervention.

Analyzer, Planner, and Monitor describe functional responsibilities. They do not assert separate deployed services. Human teaching and corrective interventions belong to learning; policy updates happen offline and candidates require validation before reuse. The page does not claim measured teaching-cost savings, unrestricted generalization, or online policy training during evaluation.

The research code repository remains restricted. Links point to its existing address and to this public website repository; no access settings are changed.
