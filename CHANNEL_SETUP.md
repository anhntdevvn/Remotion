# YouTube channel setup

Updated: 2026-10-02. Status: **Channel setup complete: settings saved, phone verified, avatar/banner/description published and checked on public channel**.

Channel: 기묘한 기록실 · @strangearchivekr  
ID: UCGYWmOaXg2Y27qA_gBaZMiw

## Prepared changes

- Country of residence: Vietnam (user confirmed actual residence). Primary audience remains South Korea.
- Channel keywords: 기묘한 기록실, 역사 이야기, 세계사, 역사 다큐멘터리, 역사 애니메이션, 실제 사건, 미스터리, 과학 이야기
- Channel audience: Not Made for Kids, consistent with general/adult documentary direction. Review individual videos if their intended audience differs.
- Upload defaults: Private; Education; video language Korean; title/description language Korean.
- Leave per-video title, description and tags blank: prepare these for each episode.
- Retain Standard YouTube licence, comments On, Basic moderation, automatic chapters and visible likes.
- Retain existing other settings; do not enable automatic dubbing or third-party AI training.

## Proposed public description — Korean

익숙한 역사 속 낯선 이야기, 실제로 일어난 기묘한 사건.

기묘한 기록실은 역사와 과학, 미스터리를 기록과 자료를 바탕으로 풀어내는 채널입니다.
지도와 애니메이션으로 사건의 흐름을 따라가며, 그 일이 왜 벌어졌는지 살펴봅니다.

확인된 사실과 아직 논쟁 중인 해석을 구분해 이야기합니다.
기록 뒤에 숨은 이야기가 궁금하다면, 기묘한 기록실과 함께해 주세요.

## Bản Việt để review

Những câu chuyện lạ trong lịch sử quen thuộc, những sự kiện kỳ lạ thực sự đã xảy ra.

기묘한 기록실 kể về lịch sử, khoa học và bí ẩn dựa trên hồ sơ và tư liệu.
Qua bản đồ và hoạt hình, kênh theo dõi diễn biến sự kiện và tìm hiểu vì sao chúng xảy ra.

Kênh phân biệt dữ kiện đã được xác nhận với những cách diễn giải còn tranh luận.
Nếu bạn muốn khám phá câu chuyện phía sau những hồ sơ, hãy cùng 기묘한 기록실 tìm hiểu.

## Observed incomplete items

- Phone verification completed: YouTube showed “Phone number verified”; Studio showed “Features enabled”. Do not record the phone number or OTP in project files.
- Original avatar and banner generated with standalone code in `src/channel-branding/`; exported to `out/channel-branding/avatar.png` (1000×1000) and `banner.png` (2560×1440). ESLint/TypeScript passed. Both uploaded into the Profile draft; crop preview checked on YouTube.
- User rejected the first banner as too plain. Rebuilt it with built-in image_gen: illustrated archive room, fictional uniformed official and archivist, dossier/maps/magnifier, teal–amber lighting. Final art source saved in `public/channel-branding/banner-illustrated-final-source.png`, exported at 2560×1440 to `out/channel-branding/banner-illustrated-final.png` (under 6 MB). Original banner retained. Prompt history: `out/channel-branding/banner-v2-prompt.md`. Crop checked in YouTube; names and faces remain readable in the mobile strip, while some decorative map/magnifier details fall outside it. User approved the new version; published and visually confirmed on the public channel. Final screenshot: `out/channel-branding/channel-published.jpg`.
- Watermark and logos inside videos are deferred until the user finishes reviewing the video. No video or thumbnail upload, metadata setup or MP4 render was performed.
- No business email or external links provided; leave blank.

## Approval and verification

User approved “Chỉ lưu cài đặt, chưa công khai mô tả”. Clicked Save; Studio displayed **Settings saved**. Reopened Settings → Channel → Basic info and confirmed Vietnam and all eight keywords persisted, with Save disabled. Screenshot: `out/channel-setup-saved.jpg`.

Other prepared settings were included in the same Save submission. Channel audience was subsequently visibly confirmed as Not Made for Kids.

Latest user scope: complete channel setup only. User approved **“Duyệt, Publish hồ sơ kênh”** for avatar, illustrated banner and Korean description. Clicked Publish; Studio returned Cancel/Publish disabled. Refreshed public channel and visually confirmed final illustrated banner and archive-folder avatar. Opened About and verified the full Korean description, Vietnam, and join date 1 Oct 2026. Public URL: https://www.youtube.com/@strangearchivekr . Screenshot: `out/channel-branding/channel-published.jpg`. No video upload performed.

Current illustrated banner tagline: 역사 속 낯선 이야기 — Những câu chuyện lạ trong lịch sử. The older geometric draft used 익숙한 역사 속, 낯선 이야기를 기록하다. Fictional artwork is channel branding, not evidence of a historical event. No copied reference artwork.

## Canonical logo assets — 2026-10-02

User requested a beautiful channel logo saved outside Git-ignored output. Retained the original archive-folder/red-question-seal design already used by the published avatar. Canonical files now live in `public/channel-branding/logo/`: `archive-logo.svg` (editable vector source), `archive-logo.png` (1024×1024 transparent overlay), and `avatar.png` (1000×1000 published avatar). See the folder README for palette, usage and export command. `ArchiveMark` reads the canonical SVG instead of maintaining duplicate geometry. Logo assets are added to Git's index; no commit created. This asset preparation does not insert a watermark into episodes or change the published profile.

Subsequent update: user expected the logo in Studio, so added the reusable `ChannelWatermark` to Action V3 only (top right, 65% opacity). Verified in localhost; no new MP4 render or public profile update. The YouTube player watermark setting remains separate and has not been changed.

Latest update: watermark is now outside the scene header, with transparent background and independent opacities (logo 60%, channel name 55%). Master v1.8 requires this shared identity in future channel videos regardless of layout. Current integration remains Action V3/full/window/beat previews; prior episode versions are preserved. No profile changes or MP4 export.
