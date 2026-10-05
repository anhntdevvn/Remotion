import { SceneData } from '../types';

export const SCENE_1_HOOK: SceneData = {
  id: 'scene-1-hook',
  title: 'SCENE 1 – HOOK',
  startFrame: 0,
  durationInFrames: 600, // 20s
  voiceoverAudio: 'audio/scene1_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  sfxAudio: 'audio/projector.wav',
  images: [
    {
      src: 'images/dien-bien-phu-valley.jpg',
      caption: 'Toàn cảnh thung lũng Điện Biên Phủ – Lòng chảo Mường Thanh',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 165,
    },
    {
      src: 'images/french-position.jpg',
      caption: 'Công sự phòng ngự và lực lượng quân Pháp tại cứ điểm',
      panDirection: 'pan-right',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 150,
    },
    {
      src: 'images/artillery.jpg',
      caption: 'Pháo binh Quân đội Nhân dân Việt Nam chiếm lĩnh trận địa trên núi cao',
      panDirection: 'pan-left',
      scaleStart: 1.05,
      scaleEnd: 1.12,
      durationInFrames: 150,
    },
    {
      src: 'images/dien-bien-phu-battle-map-1954.jpg',
      caption: 'Bản đồ bố phòng tập đoàn cứ điểm Điện Biên Phủ năm 1954',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.1,
      durationInFrames: 135,
    },
  ],
  subtitles: [
    {
      id: 'sub-1-1',
      startFrame: 3,
      endFrame: 262,
      text: 'Năm 1954, tại một thung lũng xa xôi ở Tây Bắc Việt Nam, một trong những trận đánh có ảnh hưởng lớn nhất của thế kỷ XX bắt đầu.',
      highlightWords: ['1954', 'Tây Bắc Việt Nam', 'thế kỷ XX'],
    },
    {
      id: 'sub-1-2',
      startFrame: 263,
      endFrame: 402,
      text: 'Người Pháp tin rằng Điện Biên Phủ sẽ trở thành một pháo đài bất khả xâm phạm.',
      highlightWords: ['Điện Biên Phủ', 'pháo đài bất khả xâm phạm'],
    },
    {
      id: 'sub-1-3',
      startFrame: 403,
      endFrame: 540,
      text: 'Nhưng sau 56 ngày đêm, tất cả đã thay đổi.',
      highlightWords: ['56 ngày đêm', 'thay đổi'],
    },
  ],
  keyTitles: [
    {
      text: 'PHÁO ĐÀI BẤT KHẢ XÂM PHẠM?',
      subText: 'ĐIỆN BIÊN PHỦ – 1954',
      startFrame: 30,
      durationInFrames: 200,
      size: 'huge',
    },
    {
      text: '56 NGÀY SAU',
      subText: 'TOÀN BỘ CỨ ĐIỂM SỤP ĐỔ',
      startFrame: 240,
      durationInFrames: 130,
      size: 'huge',
    },
    {
      text: 'ĐIỀU GÌ ĐÃ ĐẢO NGƯỢC CUỘC CHIẾN?',
      subText: '13/3/1954 – 7/5/1954',
      startFrame: 400,
      durationInFrames: 150,
      size: 'large',
    },
  ],
  dateMarker: {
    date: '1954',
    location: 'TÂY BẮC VIỆT NAM',
    startFrame: 20,
    durationInFrames: 130,
  },
};

export const SCENE_2_WHY_DBP: SceneData = {
  id: 'scene-2-why-dbp',
  title: 'SCENE 2 – VÌ SAO LẠI LÀ ĐIỆN BIÊN PHỦ?',
  startFrame: 600,
  durationInFrames: 720, // 24s
  voiceoverAudio: 'audio/scene2_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/location-dien-bien-phu.png',
      caption: 'Vị trí chiến lược của Điện Biên Phủ tại miền Tây Bắc Việt Nam',
      panDirection: 'zoom-in',
      scaleStart: 1.02,
      scaleEnd: 1.09,
      durationInFrames: 180,
    },
    {
      src: 'images/relief-dien-bien-phu.png',
      caption: 'Địa hình lòng chảo Mường Thanh bao quanh bởi núi non hiểm trở',
      panDirection: 'pan-left',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 180,
    },
    {
      src: 'images/french-aircraft.jpg',
      caption: 'Không quân Pháp tăng viện binh lực và vũ khí hạng nặng xuống thung lũng',
      panDirection: 'pan-right',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 180,
    },
    {
      src: 'images/french-fortress.jpg',
      caption: 'Hệ thống công sự cứ điểm bê tông ngầm kiên cố của Pháp',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 180,
    },
  ],
  subtitles: [
    {
      id: 'sub-2-1',
      startFrame: 15,
      endFrame: 215,
      text: 'Cuối năm 1953, quân đội Pháp quyết định xây dựng Điện Biên Phủ thành một tập đoàn cứ điểm mạnh.',
      highlightWords: ['1953', 'Điện Biên Phủ', 'tập đoàn cứ điểm mạnh'],
    },
    {
      id: 'sub-2-2',
      startFrame: 216,
      endFrame: 350,
      text: 'Vị trí này nằm trong một thung lũng rộng, được bao quanh bởi núi cao.',
      highlightWords: ['thung lũng rộng', 'núi cao'],
    },
    {
      id: 'sub-2-3',
      startFrame: 351,
      endFrame: 690,
      text: 'Pháp bố trí nhiều cứ điểm, sân bay, pháo binh và lực lượng phòng thủ tinh nhuệ, với mục tiêu kiểm soát khu vực Tây Bắc và buộc lực lượng Việt Minh phải bước vào một trận quyết chiến chiến lược.',
      highlightWords: ['sân bay', 'pháo binh', 'Tây Bắc', 'quyết chiến chiến lược'],
    },
  ],
  keyTitles: [
    {
      text: 'TẬP ĐOÀN CỨ ĐIỂM',
      subText: 'ĐIỆN BIÊN PHỦ – CUỐI NĂM 1953',
      startFrame: 50,
      durationInFrames: 140,
      size: 'large',
    },
    {
      text: 'PHÁO ĐÀI BẤT KHẢ XÂM PHẠM',
      subText: 'KẾ HOẠCH NAVARRE CỦA BỘ CHỈ HUY PHÁP',
      startFrame: 400,
      durationInFrames: 160,
      size: 'large',
    },
  ],
  dateMarker: {
    date: 'CUỐI NĂM 1953',
    location: 'TẬP ĐOÀN CỨ ĐIỂM ĐIỆN BIÊN PHỦ',
    startFrame: 20,
    durationInFrames: 180,
  },
  mapHighlights: [
    { name: 'Him Lam (Béatrice)', xPercent: 68, yPercent: 28, color: '#ef4444', revealFrame: 30 },
    { name: 'Độc Lập (Gabrielle)', xPercent: 42, yPercent: 18, color: '#ef4444', revealFrame: 90 },
    { name: 'Mường Thanh', xPercent: 52, yPercent: 48, color: '#3b82f6', revealFrame: 150 },
    { name: 'Đồi A1 (Eliane)', xPercent: 58, yPercent: 54, color: '#ef4444', revealFrame: 210 },
  ],
};

export const SCENE_3_PREPARATION: SceneData = {
  id: 'scene-3-preparation',
  title: 'SCENE 3 – SỰ CHUẨN BỊ CỦA QUÂN ĐỘI VIỆT MINH',
  startFrame: 1320,
  durationInFrames: 900, // 30s
  voiceoverAudio: 'audio/scene3_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/artillery.jpg',
      caption: 'Bộ đội và dân công kéo pháo bằng tay vượt qua núi cao đèo thẳm',
      panDirection: 'pan-right',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 225,
    },
    {
      src: 'images/vo-nguyen-giap.jpg',
      caption: 'Đại tướng Võ Nguyên Giáp – Tổng tư lệnh kiêm Chỉ huy trưởng chiến dịch',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.09,
      durationInFrames: 225,
    },
    {
      src: 'images/trenches.jpg',
      caption: 'Xây dựng tuyến đường hầm và trận địa bí mật áp sát thung lũng',
      panDirection: 'pan-left',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 225,
    },
    {
      src: 'images/dien-bien-phu-valley.jpg',
      caption: 'Vòng vây khổng lồ của quân và dân ta khép chặt quanh cứ điểm',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 225,
    },
  ],
  subtitles: [
    {
      id: 'sub-3-1',
      startFrame: 15,
      endFrame: 170,
      text: 'Để chuẩn bị cho chiến dịch, một hệ thống hậu cần khổng lồ được tổ chức thần tốc.',
      highlightWords: ['hậu cần khổng lồ', 'thần tốc'],
    },
    {
      id: 'sub-3-2',
      startFrame: 171,
      endFrame: 420,
      text: 'Hàng vạn bộ đội, dân công hỏa tuyến và thanh niên xung phong đưa lương thực, đạn dược và kéo những khẩu pháo nặng hàng tấn vượt qua đèo cao dốc thẳm.',
      highlightWords: ['dân công hỏa tuyến', 'kéo những khẩu pháo', 'đèo cao dốc thẳm'],
    },
    {
      id: 'sub-3-3',
      startFrame: 421,
      endFrame: 540,
      text: 'Đại tướng Võ Nguyên Giáp được giao trọng trách Tư lệnh chiến dịch.',
      highlightWords: ['Đại tướng Võ Nguyên Giáp', 'Tư lệnh chiến dịch'],
    },
    {
      id: 'sub-3-4',
      startFrame: 541,
      endFrame: 860,
      text: 'Tại mặt trận, trước giờ nổ súng, Đại tướng đã đưa ra quyết định lịch sử khó khăn nhất trong đời cầm quân: chuyển phương châm tác chiến từ đánh nhanh thắng nhanh sang đánh chắc tiến chắc.',
      highlightWords: ['quyết định lịch sử', 'đánh chắc tiến chắc'],
    },
  ],
  keyTitles: [
    {
      text: 'ĐÁNH CHẮC – TIẾN CHẮC',
      subText: 'QUYẾT ĐỊNH LỊCH SỬ THAY ĐỔI CỤC DIỆN',
      startFrame: 580,
      durationInFrames: 220,
      size: 'huge',
    },
  ],
  lowerThird: {
    name: 'ĐẠI TƯỚNG VÕ NGUYÊN GIÁP',
    title: 'Tư lệnh Chiến dịch Điện Biên Phủ',
    startFrame: 380,
    durationInFrames: 220,
  },
  dateMarker: {
    date: 'ĐẦU NĂM 1954',
    location: 'SỞ CHỈ HUY CHIẾN DỊCH – MƯỜNG PHĂNG',
    startFrame: 20,
    durationInFrames: 160,
  },
};

export const SCENE_4_OPENING_BATTLE: SceneData = {
  id: 'scene-4-opening-battle',
  title: 'SCENE 4 – 13/3/1954: TRẬN ĐÁNH BẮT ĐẦU',
  startFrame: 2220,
  durationInFrames: 870, // 29s
  voiceoverAudio: 'audio/scene4_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/artillery.jpg',
      caption: 'Pháo binh đồng loạt nổ súng trút bão lửa xuống cứ điểm Him Lam',
      panDirection: 'zoom-in',
      scaleStart: 1.05,
      scaleEnd: 1.13,
      durationInFrames: 220,
    },
    {
      src: 'images/dien-bien-phu-battle-map-1954.jpg',
      caption: 'Mũi tiến công tiêu diệt phân khu Bắc: Him Lam và Độc Lập',
      panDirection: 'pan-left',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 220,
    },
    {
      src: 'images/french-position.jpg',
      caption: 'Cứ điểm Him Lam tan hoang sau những loạt pháo công phá mãnh liệt',
      panDirection: 'pan-right',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 215,
    },
    {
      src: 'images/trenches.jpg',
      caption: 'Chiến sĩ xung kích làm chủ trận địa, đập tan bức tường phía bắc',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 215,
    },
  ],
  subtitles: [
    {
      id: 'sub-4-1',
      startFrame: 15,
      endFrame: 230,
      text: 'Đúng 17 giờ ngày 13 tháng 3 năm 1954, pháo binh Việt Minh đồng loạt gầm vang khai hỏa.',
      highlightWords: ['17 giờ ngày 13 tháng 3 năm 1954', 'khai hỏa'],
    },
    {
      id: 'sub-4-2',
      startFrame: 231,
      endFrame: 335,
      text: 'Mục tiêu mở màn là cụm cứ điểm Him Lam.',
      highlightWords: ['cụm cứ điểm Him Lam'],
    },
    {
      id: 'sub-4-3',
      startFrame: 336,
      endFrame: 490,
      text: 'Đòn pháo kích bất ngờ và chuẩn xác làm tê liệt pháo đài bất khả xâm phạm của Pháp.',
      highlightWords: ['bất ngờ và chuẩn xác', 'tê liệt'],
    },
    {
      id: 'sub-4-4',
      startFrame: 491,
      endFrame: 600,
      text: 'Ngay trong đêm, Him Lam hoàn toàn thất thủ.',
      highlightWords: ['Him Lam', 'hoàn toàn thất thủ'],
    },
    {
      id: 'sub-4-5',
      startFrame: 601,
      endFrame: 840,
      text: 'Tiếp đó, đồi Độc Lập và cứ điểm Bản Kéo lần lượt bị tiêu diệt, đập tan bức tường thép phía bắc của tập đoàn cứ điểm.',
      highlightWords: ['đồi Độc Lập', 'Bản Kéo', 'bức tường thép phía bắc'],
    },
  ],
  keyTitles: [
    {
      text: '17:00 – 13/3/1954',
      subText: 'TIẾNG PHÁO MỞ MÀN TẠI HIM LAM',
      startFrame: 30,
      durationInFrames: 170,
      size: 'huge',
    },
    {
      text: 'HIM LAM THẤT THỦ',
      subText: 'CÁNH CỬA PHÍA BẮC SỤP ĐỔ',
      startFrame: 440,
      durationInFrames: 180,
      size: 'large',
    },
  ],
  dateMarker: {
    date: '13 THÁNG 3 NĂM 1954',
    location: 'CỨ ĐIỂM HIM LAM – ĐIỆN BIÊN PHỦ',
    startFrame: 15,
    durationInFrames: 180,
  },
};

export const SCENE_5_TRENCH_WARFARE: SceneData = {
  id: 'scene-5-trench-warfare',
  title: 'SCENE 5 – CUỘC CHIẾN TRONG HỆ THỐNG CHIẾN HÀO',
  startFrame: 3090,
  durationInFrames: 870, // 29s
  voiceoverAudio: 'audio/scene5_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/trenches.jpg',
      caption: 'Mạng lưới chiến hào chằng chịt đào xuyên ngày đêm áp sát trung tâm',
      panDirection: 'pan-left',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 220,
    },
    {
      src: 'images/french-trench.jpg',
      caption: 'Chiến hào chia cắt các phân khu, siết chặt vòng vây bóp nghẹt đối phương',
      panDirection: 'pan-right',
      scaleStart: 1.03,
      scaleEnd: 1.11,
      durationInFrames: 220,
    },
    {
      src: 'images/french-aircraft.jpg',
      caption: 'Sân bay Mường Thanh bị khống chế, tiếp tế đường không bị tê liệt',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 215,
    },
    {
      src: 'images/dien-bien-phu-map.png',
      caption: 'Chiến trường thu hẹp từng ngày quanh sở chỉ huy De Castries',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 215,
    },
  ],
  subtitles: [
    {
      id: 'sub-5-1',
      startFrame: 15,
      endFrame: 200,
      text: 'Bước sang đợt hai, chiến trường Điện Biên Phủ biến thành cuộc chiến trong lòng đất chưa từng có trong lịch sử.',
      highlightWords: ['đợt hai', 'cuộc chiến trong lòng đất'],
    },
    {
      id: 'sub-5-2',
      startFrame: 201,
      endFrame: 435,
      text: 'Hàng trăm kilômét chiến hào chằng chịt ngày đêm được đào xới, vươn dài từng mét, thắt chặt vòng vây quanh khu trung tâm Mường Thanh.',
      highlightWords: ['Hàng trăm kilômét chiến hào', 'Mường Thanh'],
    },
    {
      id: 'sub-5-3',
      startFrame: 436,
      endFrame: 660,
      text: 'Dưới làn mưa bom bão đạn và bùn lầy, các chiến hào siết chặt làm tê liệt sân bay, cắt đứt hoàn toàn nguồn tiếp tế đường không.',
      highlightWords: ['tê liệt sân bay', 'cắt đứt nguồn tiếp tế'],
    },
    {
      id: 'sub-5-4',
      startFrame: 661,
      endFrame: 810,
      text: 'Đạo quân viễn chinh Pháp rơi vào thế bị bao vây cô lập nghẹt thở.',
      highlightWords: ['bao vây cô lập nghẹt thở'],
    },
  ],
  keyTitles: [
    {
      text: 'CHIẾN HÀO SIẾT CHẶT',
      subText: 'CUỘC CHIẾN TRONG LÒNG ĐẤT',
      startFrame: 220,
      durationInFrames: 240,
      size: 'huge',
    },
  ],
  dateMarker: {
    date: 'THÁNG 4 NĂM 1954',
    location: 'MẶT TRẬN CHIẾN HÀO MƯỜNG THANH',
    startFrame: 20,
    durationInFrames: 170,
  },
};

export const SCENE_6_HILL_A1: SceneData = {
  id: 'scene-6-hill-a1',
  title: 'SCENE 6 – ĐỒI A1',
  startFrame: 3960,
  durationInFrames: 840, // 28s
  voiceoverAudio: 'audio/scene6_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/hill-a1.jpg',
      caption: 'Hệ thống hầm ngầm cố thủ kiên cố của Pháp trên đỉnh đồi A1 (Eliane 2)',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 210,
    },
    {
      src: 'images/trenches.jpg',
      caption: 'Chiến hào đào sâu vào lòng đồi để bí mật đưa khối bộc phá áp sát hầm ngầm',
      panDirection: 'pan-left',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 210,
    },
    {
      src: 'images/french-position.jpg',
      caption: 'Trận chiến giằng co từng tấc đất ác liệt suốt 39 ngày đêm',
      panDirection: 'pan-right',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 210,
    },
    {
      src: 'images/hill-a1.jpg',
      caption: 'Đồi A1 thất thủ, mở toang cánh cửa xung phong vào khu trung tâm',
      panDirection: 'zoom-out',
      scaleStart: 1.12,
      scaleEnd: 1.04,
      durationInFrames: 210,
    },
  ],
  subtitles: [
    {
      id: 'sub-6-1',
      startFrame: 15,
      endFrame: 245,
      text: 'Một trong những trận đánh ác liệt và đẫm máu nhất diễn ra tại đồi A1, chìa khóa sống còn bảo vệ khu sở chỉ huy Mường Thanh.',
      highlightWords: ['đồi A1', 'chìa khóa sống còn', 'Mường Thanh'],
    },
    {
      id: 'sub-6-2',
      startFrame: 246,
      endFrame: 445,
      text: 'Cuộc chiến tại đây giằng co quyết liệt từng tấc đất suốt 39 ngày đêm với nhiều đợt xung phong và phản kích dữ dội.',
      highlightWords: ['39 ngày đêm', 'xung phong và phản kích'],
    },
    {
      id: 'sub-6-3',
      startFrame: 446,
      endFrame: 780,
      text: 'Đêm ngày 6 tháng 5, khối bộc phá gần một nghìn cân phát nổ làm rung chuyển lòng đồi A1, xé toang công sự kiên cố cuối cùng của quân Pháp, mở toang cánh cửa vào khu trung tâm.',
      highlightWords: ['Đêm ngày 6 tháng 5', 'khối bộc phá gần một nghìn cân', 'mở toang cánh cửa'],
    },
  ],
  keyTitles: [
    {
      text: 'ĐỒI A1',
      subText: 'TRẬN QUYẾT CHIẾN 39 NGÀY ĐÊM',
      startFrame: 40,
      durationInFrames: 180,
      size: 'huge',
    },
    {
      text: 'BỘC PHÁ NGHÌN CÂN',
      subText: 'ĐÊM 6 THÁNG 5 NĂM 1954',
      startFrame: 460,
      durationInFrames: 220,
      size: 'large',
    },
  ],
  dateMarker: {
    date: 'THÁNG 4 – ĐẦU THÁNG 5/1954',
    location: 'CỨ ĐIỂM ĐỒI A1 (ELIANE 2)',
    startFrame: 20,
    durationInFrames: 170,
  },
};

export const SCENE_7_FINAL_ASSAULT: SceneData = {
  id: 'scene-7-final-assault',
  title: 'SCENE 7 – NGÀY 7/5/1954',
  startFrame: 4800,
  durationInFrames: 840, // 28s
  voiceoverAudio: 'audio/scene7_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/dien-bien-phu-battle-map-1954.jpg',
      caption: 'Các mũi tiến công đồng loạt áp sát khu trung tâm Mường Thanh',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 240,
    },
    {
      src: 'images/dien-bien-phu-victory.jpg',
      caption: 'Lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm chỉ huy De Castries',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.11,
      durationInFrames: 300,
    },
    {
      src: 'images/de-castries.jpg',
      caption: 'Tướng Christian de Castries cùng toàn bộ cơ quan đầu não bị bắt sống',
      panDirection: 'pan-left',
      scaleStart: 1.04,
      scaleEnd: 1.12,
      durationInFrames: 300,
    },
  ],
  subtitles: [
    {
      id: 'sub-7-1',
      startFrame: 15,
      endFrame: 220,
      text: 'Chiều ngày 7 tháng 5 năm 1954, quân đội Việt Minh mở cuộc tổng công kích trên toàn mặt trận.',
      highlightWords: ['Chiều ngày 7 tháng 5 năm 1954', 'tổng công kích'],
    },
    {
      id: 'sub-7-2',
      startFrame: 221,
      endFrame: 410,
      text: 'Đến 17 giờ 30 phút, lá cờ Quyết chiến Quyết thắng kiêu hãnh tung bay trên nóc hầm chỉ huy Mường Thanh.',
      highlightWords: ['17 giờ 30 phút', 'lá cờ Quyết chiến Quyết thắng', 'hầm chỉ huy'],
    },
    {
      id: 'sub-7-3',
      startFrame: 411,
      endFrame: 590,
      text: 'Tướng Christian de Castries cùng toàn bộ ban tham mưu tập đoàn cứ điểm cúi đầu đầu hàng.',
      highlightWords: ['Tướng Christian de Castries', 'cúi đầu đầu hàng'],
    },
    {
      id: 'sub-7-4',
      startFrame: 591,
      endFrame: 780,
      text: 'Chiến dịch Điện Biên Phủ toàn thắng vang dội sau 56 ngày đêm chiến đấu ngoan cường.',
      highlightWords: ['toàn thắng vang dội', '56 ngày đêm'],
    },
  ],
  keyTitles: [
    {
      text: '7 THÁNG 5 NĂM 1954',
      subText: '17:30 – LÁ CỜ CHIẾN THẮNG TRÊN NÓC HẦM DE CASTRIES',
      startFrame: 40,
      durationInFrames: 220,
      size: 'huge',
    },
    {
      text: 'CHIẾN DỊCH TOÀN THẮNG',
      subText: '56 NGÀY ĐÊM LỪNG LẪY NĂM CHÂU',
      startFrame: 520,
      durationInFrames: 240,
      size: 'huge',
    },
  ],
  dateMarker: {
    date: '7 THÁNG 5 NĂM 1954',
    location: 'SỞ CHỈ HUY MƯỜNG THANH – ĐIỆN BIÊN PHỦ',
    startFrame: 15,
    durationInFrames: 190,
  },
};

export const SCENE_8_HISTORICAL_IMPACT: SceneData = {
  id: 'scene-8-historical-impact',
  title: 'SCENE 8 – Ý NGHĨA LỊCH SỬ',
  startFrame: 5640,
  durationInFrames: 720, // 24s
  voiceoverAudio: 'audio/scene8_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/dien-bien-phu-victory.jpg',
      caption: 'Niềm vui chiến thắng vĩ đại của quân và dân ta sau 9 năm kháng chiến',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.10,
      durationInFrames: 240,
    },
    {
      src: 'images/geneva-1954.jpg',
      caption: 'Hội nghị Genève 1954: Các cường quốc công nhận độc lập của Việt Nam',
      panDirection: 'pan-left',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 240,
    },
    {
      src: 'images/indochina-map-1954.svg',
      caption: 'Bản đồ Đông Dương trong bối cảnh Hiệp định Genève năm 1954',
      panDirection: 'zoom-in',
      scaleStart: 1.02,
      scaleEnd: 1.08,
      durationInFrames: 240,
    },
  ],
  subtitles: [
    {
      id: 'sub-8-1',
      startFrame: 15,
      endFrame: 175,
      text: 'Chiến thắng Điện Biên Phủ là bước ngoặt quyết định chấm dứt hoàn toàn cuộc chiến tranh Đông Dương.',
      highlightWords: ['bước ngoặt quyết định', 'chiến tranh Đông Dương'],
    },
    {
      id: 'sub-8-2',
      startFrame: 176,
      endFrame: 450,
      text: 'Chỉ hai tháng sau, Hiệp định Genève năm 1954 được ký kết, buộc thực dân Pháp phải công nhận độc lập, chủ quyền và toàn vẹn lãnh thổ của Việt Nam.',
      highlightWords: ['Hiệp định Genève năm 1954', 'độc lập, chủ quyền', 'toàn vẹn lãnh thổ'],
    },
    {
      id: 'sub-8-3',
      startFrame: 451,
      endFrame: 710,
      text: 'Đây là mốc son chói lọi trong lịch sử quân sự thế kỷ hai mươi, thức tỉnh phong trào đấu tranh giải phóng dân tộc trên toàn thế giới.',
      highlightWords: ['mốc son chói lọi', 'giải phóng dân tộc trên toàn thế giới'],
    },
  ],
  keyTitles: [
    {
      text: 'Ý NGHĨA LỊCH SỬ',
      subText: 'BƯỚC NGOẶT CỦA CHIẾN TRANH ĐÔNG DƯƠNG',
      startFrame: 30,
      durationInFrames: 180,
      size: 'large',
    },
    {
      text: 'HIỆP ĐỊNH GENÈVE 1954',
      subText: 'CÔNG NHẬN ĐỘC LẬP, CHỦ QUYỀN VÀ TOÀN VẸN LÃNH THỔ',
      startFrame: 230,
      durationInFrames: 200,
      size: 'large',
    },
  ],
  dateMarker: {
    date: 'THÁNG 7 NĂM 1954',
    location: 'HỘI NGHỊ GENÈVE – THỤY SĨ',
    startFrame: 20,
    durationInFrames: 170,
  },
};

export const SCENE_9_OUTRO: SceneData = {
  id: 'scene-9-outro',
  title: 'SCENE 9 – OUTRO',
  startFrame: 6360,
  durationInFrames: 720, // 24s, includes a 7s YouTube end screen
  voiceoverAudio: 'audio/scene9_vo.mp3',
  bgAudio: 'audio/bg_drone.wav',
  images: [
    {
      src: 'images/monument-dien-bien-phu.jpg',
      caption: 'Tượng đài Chiến thắng Điện Biên Phủ trên đồi D1 ngày nay',
      panDirection: 'zoom-in',
      scaleStart: 1.03,
      scaleEnd: 1.09,
      durationInFrames: 360,
    },
    {
      src: 'images/dien-bien-phu-valley-real.jpg',
      caption: 'Thành phố Điện Biên Phủ hòa bình, đổi mới và phát triển',
      panDirection: 'zoom-in',
      scaleStart: 1.04,
      scaleEnd: 1.11,
      durationInFrames: 360,
    },
  ],
  subtitles: [
    {
      id: 'sub-9-1',
      startFrame: 3,
      endFrame: 272,
      text: '56 ngày đêm khoét núi ngủ hầm, mưa dầm cơm vắt, máu trộn bùn non đã làm nên một Điện Biên Phủ lừng lẫy năm châu, chấn động địa cầu.',
      highlightWords: ['56 ngày đêm', 'lừng lẫy năm châu, chấn động địa cầu'],
    },
    {
      id: 'sub-9-2',
      startFrame: 273,
      endFrame: 484,
      text: 'Bản anh hùng ca bất diệt của lòng yêu nước và ý chí quật cường của dân tộc Việt Nam mãi mãi tỏa sáng cùng non sông đất nước.',
      highlightWords: ['Bản anh hùng ca bất diệt', 'mãi mãi tỏa sáng'],
    },
  ],
  keyTitles: [
    {
      text: 'ĐIỆN BIÊN PHỦ – 1954',
      subText: '13/3/1954 – 7/5/1954',
      startFrame: 30,
      durationInFrames: 250,
      size: 'huge',
    },
  ],
  dateMarker: {
    date: '1954 – HÔM NAY',
    location: 'TƯỢNG ĐÀI CHIẾN THẮNG ĐIỆN BIÊN PHỦ',
    startFrame: 15,
    durationInFrames: 160,
  },
};

export const ALL_SCENES: SceneData[] = [
  SCENE_1_HOOK,
  SCENE_2_WHY_DBP,
  SCENE_3_PREPARATION,
  SCENE_4_OPENING_BATTLE,
  SCENE_5_TRENCH_WARFARE,
  SCENE_6_HILL_A1,
  SCENE_7_FINAL_ASSAULT,
  SCENE_8_HISTORICAL_IMPACT,
  SCENE_9_OUTRO,
];

export const SCENE_TRANSITION_FRAMES = 12;

export const FULL_VIDEO_DURATION_IN_FRAMES =
  ALL_SCENES.reduce((total, scene) => total + scene.durationInFrames, 0) -
  SCENE_TRANSITION_FRAMES * (ALL_SCENES.length - 1);
