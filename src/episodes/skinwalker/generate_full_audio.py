import os, subprocess, json
from gtts import gTTS

audio_dir = '/home/anhnt/Documents/Remotion/public/episodes/skinwalker/audio'
ffmpeg_bin = '/home/anhnt/Documents/Remotion/node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'
os.makedirs(audio_dir, exist_ok=True)

full_scenes = [
    {
        'id': 'scene1_prologue',
        'title': 'Hồi 1: Hoang Mạc Tây Nam & Điều Cấm Kỵ Của Người Diné',
        'dateMarker': {'date': 'VÙNG TÂY NAM HOA KỲ', 'location': 'Vùng đất Diné Bikéyah'},
        'text': (
            "Tại những vùng hoang mạc mênh mông trải dài qua ranh giới bốn bang Utah, Arizona, New Mexico và Colorado, "
            "màn đêm luôn mang một sức nặng khác thường. Khi ánh hoàng hôn tím thẫm lịm dần sau những rặng sa thạch ngàn năm, "
            "không gian rơi vào một sự tĩnh lặng gần như tuyệt đối. Gió lạnh từ các hẻm núi thổi qua bụi cây xô thơm, "
            "cuốn theo những câu chuyện mà người ngoài hiếm khi có cơ hội được lắng nghe một cách trọn vẹn.\n\n"
            "Trong văn hóa truyền thống sâu sắc của người Diné, tức người Navajo, thế giới được vận hành dựa trên khái niệm Hózhǫ́ — "
            "sự hài hòa, trật tự, vẻ đẹp và cân bằng thiêng liêng giữa con người với đất trời. "
            "Thế nhưng, song hành cùng sự thiêng liêng ấy, trong bóng tối của các hẻm vực cằn cỗi, tồn tại một thế lực đối nghịch "
            "được gọi là ánt'įįhnii, ma thuật bóng tối. Từ nhánh ma thuật này sinh ra một điều cấm kỵ đáng sợ bậc nhất: "
            "yee naaldlooshii, những kẻ bước đi bằng bốn chân, hay còn được thế giới hiện đại gọi bằng cái tên Skinwalker.\n\n"
            "Trong quan niệm bản địa, đây không phải là một loài quái vật thần thoại hay một sinh vật giải trí trong các bộ phim kinh dị. "
            "Họ là những phù thủy đã từ bỏ hoàn toàn đạo đức con người, thực hiện những nghi thức nghịch thiên để đạt được năng lực "
            "thay hình đổi dạng, khoác lên mình tấm da thú hoang và chiếm đoạt khả năng di chuyển phi thường của chúng. "
            "Người Navajo có một nguyên tắc bất biến: tuyệt đối không bàn tán về yee naaldlooshii với người lạ, "
            "thậm chí kiêng kỵ nhắc đến tên của chúng ngay trong chính gia đình mình. Họ tin rằng chỉ một ý nghĩ hay một lời nhắc đến "
            "cũng đủ để thu hút ánh nhìn của những kẻ đang ẩn nấp ngoài bóng tối kia.\n\n"
            "Thế nhưng, điều kỳ lạ là suốt nhiều thập kỷ qua, tại những trang trại hẻo lánh, những cung đường đèo heo hút "
            "giáp ranh giữa khu bảo tồn và thế giới bên ngoài, hàng loạt nhân chứng thuộc nhiều thành phần xã hội khác nhau — "
            "từ những người chăn cừu bản địa, nhân viên bảo tồn, tài xế xe tải đường dài cho đến các gia đình mới chuyển đến sinh sống — "
            "đều ghi nhận những trải nghiệm với những khuôn mẫu dị thường tương đồng đến rợn người. "
            "Đó là những sinh thể di chuyển với vận tốc vượt xa mọi quy luật sinh học, "
            "những đôi mắt phản quang kỳ lạ sau lớp kính cửa sổ, "
            "và đặc biệt nhất: khả năng mô phỏng chuẩn xác giọng nói của những người thân yêu nhất, "
            "cất lên từ khoảng tối mịt mùng của rừng sâu nhằm dẫn dụ con mồi rời khỏi vùng sáng an toàn.\n\n"
            "Hôm nay, chúng ta sẽ lần theo những hồ sơ nhân chứng được ghi chép cẩn trọng nhất tại vùng đất này. "
            "Không phải để giật gân, mà để đối diện với một câu hỏi đã tồn tại qua nhiều thế hệ: "
            "Liệu điều gì thực sự đang lướt đi trong những đêm đông lạnh giá của miền Tây Nam hoang vu?"
        ),
        'subtitles': [
            "Tại những vùng hoang mạc mênh mông của miền Tây Nam nước Mỹ, màn đêm luôn mang một sức nặng khác thường.",
            "Khi hoàng hôn lịm dần sau rặng sa thạch, không gian rơi vào sự tĩnh lặng gần như tuyệt đối.",
            "Trong văn hóa của người Diné, thế giới vận hành dựa trên Hózhǫ́ - sự hài hòa và trật tự thiêng liêng.",
            "Song hành cùng sự thiêng liêng ấy là ma thuật bóng tối ánt'įįhnii, và điều cấm kỵ mang tên yee naaldlooshii.",
            "Yee naaldlooshii - những kẻ đi bằng bốn chân, không phải quái vật giải trí mà là điều cấm kỵ tâm linh nghiêm ngặt.",
            "Người Navajo kiêng kỵ tuyệt đối việc nhắc tên chúng, bởi họ tin sự chú ý sẽ dẫn dụ tà khí từ bóng tối.",
            "Thế nhưng suốt nhiều thập kỷ qua, hàng loạt nhân chứng độc lập lại cùng ghi nhận những hiện tượng tương đồng rợn người:",
            "Sinh thể di chuyển vượt quy luật cơ học, đôi mắt phản quang qua cửa sổ và khả năng bắt chước giọng người thân.",
            "Tiếng gọi quen thuộc cất lên từ rừng sâu nhằm dẫn dụ nhân chứng rời khỏi vùng sáng an toàn.",
            "Hôm nay, chúng ta lần theo những hồ sơ nhân chứng được ghi chép cẩn trọng nhất tại miền Tây Nam hoang vu."
        ]
    },
    {
        'id': 'scene2_utah_cabin',
        'title': 'Hồi 2: Sự Cố Ngôi Nhà Gỗ Utah – Mùa Đông 2010',
        'dateMarker': {'date': 'MÙA ĐÔNG 2010', 'location': 'Khu vực hẻo lánh, Bang Utah'},
        'text': (
            "Vào tháng 12 năm 2010, một gia đình gồm bốn thành viên chuyển đến sinh sống tại một căn nhà gỗ rộng lớn "
            "nằm sâu trong một thung lũng hẻo lánh ở bang Utah, cách thị trấn gần nhất hơn hai mươi cây số. "
            "Khu đất được bao bọc bởi những rặng thông già rậm rạp và những sườn đồi thoai thoải phủ đầy tuyết trắng. "
            "Mùa đông năm đó đến sớm và khắc nghiệt hơn thường lệ, những đợt bão tuyết liên tiếp khiến con đường đất dẫn vào nhà "
            "thường xuyên bị cô lập hoàn toàn.\n\n"
            "Mọi chuyện bắt đầu vào một buổi tối Chủ nhật tĩnh mịch, khoảng hơn chín giờ đêm. "
            "Cậu con trai út chín tuổi khoác áo ấm bước ra sân sau để lấy củi cho lò sưởi. "
            "Đi cùng cậu là chú chó săn lông vàng của gia đình, một con vật vốn dĩ vô cùng hiếu động và luôn quấn quýt lấy cậu bé. "
            "Thế nhưng ngay khi bước ra khỏi cửa sau, chú chó bỗng dừng phắt lại. "
            "Hai chân trước của nó bám chặt lấy sàn gỗ hiên nhà, lông gáy dựng đứng, toàn thân run rẩy dữ dội. "
            "Mặc cho cậu bé gọi nhiều lần, con vật dứt khoát không chịu đặt chân xuống lớp tuyết trắng ngoài sân, "
            "đôi mắt nó nhìn trừng trừng vào khoảng đen mịt mùng nơi bìa rừng thông.\n\n"
            "Chỉ vài giây sau, một âm thanh vang lên từ góc xa của khuôn viên đất. Đó là một tiếng sủa ngắn, sắc và đanh. "
            "Điều khiến cậu bé bàng hoàng là âm sắc, cao độ và nhịp điệu của tiếng sủa ấy giống hệt như tiếng của chính chú chó đang đứng cạnh cậu, "
            "như thể đang có một bản sao vô hình đang cố tình gọi cậu bước lại gần bìa cây. "
            "Bối rối, cậu quay lại nhìn con chó của mình thì thấy nó vẫn đứng im bất động trên hiên, miệng gầm gừ nghẹn lại trong cổ họng. "
            "Ngay sau đó, tiếng sủa thứ hai lại vang lên từ phía nhà kho cũ bỏ hoang bên hông. "
            "Quá sợ hãi, cậu bé buông rơi bó củi và lao vội vào trong nhà gọi cha mẹ.\n\n"
            "Hai đêm sau đó, sự quấy nhiễu bắt đầu leo thang rõ rệt. "
            "Vào khoảng nửa đêm, một tiếng va đập nặng nề vang lên làm rung chuyển toàn bộ vách gỗ phòng khách, "
            "như thể có một vật thể cực lớn vừa ngã sầm vào tường. "
            "Người cha cầm đèn pin bước ra ngoài kiểm tra nhưng không hề có cành cây nào gãy rơi. "
            "Trên mặt tuyết xốp mịn mới rơi cạnh chân tường chỉ xuất hiện một vùng trũng lớn, phẳng lì, "
            "như thể có một sinh thể kích thước khổng lồ vừa nằm phục tại đó nhiều phút rồi biến mất mà không hề để lại bất kỳ dấu vết nào.\n\n"
            "Đến đêm thứ tư, người mẹ đang đứng trong bếp pha sữa nóng cho các con thì nghe thấy tiếng gõ nhẹ, nhịp nhàng trên mặt kính cửa sổ. "
            "Nghĩ rằng chồng mình đang ở ngoài hiên dọn tuyết, bà mỉm cười bước lại gần và kéo nhẹ rèm che. "
            "Nhưng cảnh tượng trước mắt khiến bà chết lặng: "
            "Cách lớp kính đóng băng chưa đầy hai mươi centimet, một khuôn mặt nhợt nhạt đang áp sát nhìn vào. "
            "Các đường nét bị che mờ bởi sương giá, nhưng đôi mắt của nó phản chiếu ánh đèn vàng của gian bếp với một luồng sáng xanh lạnh lẽo — "
            "thứ ánh sáng phản quang chỉ có ở mắt của loài dã thú săn đêm. Bà thét lên kinh hoàng, đánh rơi cốc sữa xuống sàn.\n\n"
            "Đỉnh điểm xảy ra vào đêm ngày 23 tháng 12. Người cha bước ra sân khóa cửa nhà kho dụng cụ. "
            "Khi vừa xoay chìa khóa, ông bỗng nghe thấy tiếng rên rỉ nghẹn ngào của chú chó nhà mình phát ra từ một lùm cây cách đó mười mét. "
            "Nhưng khi quay đầu nhìn lại bậc thềm nhà, chú chó vẫn đang nằm run rẩy sau cánh cửa kính. "
            "Và rồi, từ trong bóng tối của lùm cây, một giọng phụ nữ cất lên gọi tên ông một cách tha thiết. "
            "Đó chính xác là giọng nói của vợ ông, nhưng ngữ điệu lại hơi méo mó, giống như được phát ra qua một kẽ răng nghiến chặt. "
            "Khi ông lùi lại, giọng nói đó lập tức biến đổi, chuyển thành tiếng con gái nhỏ khóc lóc van xin giúp đỡ. "
            "Từ rìa cánh đồng tuyết, một sinh thể cao lêu nghêu bước ra — thân hình gầy guộc, hai cánh tay dài quá đầu gối, "
            "và phần đầu lắc lư không cố định hình dạng. Người cha lao thục mạng vào nhà và chốt chặt cửa.\n\n"
            "Suốt đêm hôm ấy cho đến tận bình minh, cả gia đình co cụm lại trong phòng khách lắng nghe tiếng móng tay nhọn cào rít "
            "chậm rãi, có phương pháp dọc theo các thanh gỗ bên ngoài vách nhà, đi từ đầu này sang đầu kia rồi lặp lại. "
            "Sáng hôm sau, dấu vết duy nhất còn sót lại là một hàng vết chân trần sải dài cách nhau gần hai mét, "
            "bước đều đặn băng qua cánh đồng tuyết rồi biến mất vào khoảng không. "
            "Ngay mùa xuân năm sau, gia đình đã quyết định bán tháo căn nhà và chuyển đi nơi khác."
        ),
        'subtitles': [
            "Tháng 12 năm 2010, một gia đình bốn người chuyển đến căn nhà gỗ biệt lập ở vùng nông thôn bang Utah.",
            "Căn nhà nằm sâu trong thung lũng tuyết, cách thị trấn hơn hai mươi cây số giữa những cánh rừng thông già.",
            "Tối Chủ nhật, cậu con trai chín tuổi ra sân lấy củi cùng chú chó săn lông vàng quen thuộc.",
            "Nhưng chú chó bỗng đứng khựng lại bên hiên, lông gáy dựng đứng, run rẩy nhìn vào bìa rừng tăm tối.",
            "Từ bóng tối xa xăm vang lên tiếng sủa có âm sắc và nhịp điệu giống hệt chú chó đang đứng cạnh cậu bé.",
            "Tiếng sủa thứ hai lại vang lên từ nhà kho bỏ hoang, cậu bé hoảng loạn bỏ chạy vào nhà báo cho cha mẹ.",
            "Hai đêm sau, một tiếng va đập nặng nề làm rung chuyển vách nhà lúc nửa đêm.",
            "Trên mặt tuyết xốp mịn chỉ có một vùng trũng lớn, phẳng lì như có vật thể khổng lồ vừa nằm phục rồi biến mất.",
            "Đến đêm thứ tư, người mẹ nghe tiếng gõ trên cửa sổ bếp và thấy một khuôn mặt nhợt nhạt với đôi mắt phản quang như thú hoang.",
            "Đêm 23 tháng 12, người cha ra khóa nhà kho thì nghe thấy tiếng vợ gọi tên tha thiết từ bụi cây rậm rạp.",
            "Khi ông lùi lại, giọng nói méo mó đổi thành tiếng con gái kêu cứu, và một sinh thể cao lêu nghêu sải bước trên tuyết.",
            "Suốt đêm, tiếng móng cào rít trên vách gỗ từng hồi. Sáng hôm sau chỉ còn lại chuỗi dấu chân sải dài phi lý biến mất ra đồng trống."
        ]
    },
    {
        'id': 'scene3_mexican_water',
        'title': 'Hồi 3: Bước Chân Đồng Bộ Ở Mexican Water – 1998',
        'dateMarker': {'date': 'MÙA THU 1998', 'location': 'Mexican Water, Khu bảo tồn Navajo'},
        'text': (
            "Năm 1998, tại khu vực hẻo lánh Mexican Water nằm sâu trong địa phận Khu bảo tồn Navajo, "
            "một cựu nhân viên cảnh sát bảo tồn tên là Edward Nez đã được một đồng nghiệp nhờ quay lại kiểm tra "
            "tình hình phúc lợi của một cặp vợ chồng cao tuổi người bản địa: ông Thomas và bà Evelyn Yazzie.\n\n"
            "Con gái của họ, hiện đang sinh sống và làm việc tại một thành phố lớn cách đó hàng trăm dặm, "
            "đã nhiều lần liên hệ với cơ quan chức năng trong sự lo âu tột độ. Cô cho biết trong các cuộc điện thoại định kỳ, "
            "cha mẹ cô thường xuyên tỏ ra sợ hãi, nói về những điều kỳ lạ xảy ra xung quanh nhà nhưng lại kiên quyết từ chối giải thích chi tiết, "
            "đúng theo truyền thống kiêng kỵ của bộ tộc. "
            "Chỉ sau nhiều lần thăm hỏi chân thành và kiên nhẫn, viên cảnh sát Nez mới dần hiểu được cơn ác mộng mà đôi vợ chồng già đang phải trải qua.\n\n"
            "Vợ chồng ông Thomas sinh sống tại khu đất này đã trọn cả cuộc đời, chăn thả một đàn cừu nhỏ gần một khe núi cạn phía sau nhà. "
            "Mọi chuyện bắt đầu từ cuối mùa hè năm đó. Một đêm nọ, bà Evelyn giật mình tỉnh giấc bởi tiếng gõ nhẹ nhàng, đều đặn trên kính cửa sổ phòng khách. "
            "Khi bà cầm đèn bước ra kiểm tra, ngoài sân hoàn toàn trống trơn. "
            "Khoảng một tuần sau, những âm thanh kỳ lạ lại xuất hiện, lần này là tiếng ai đó thì thầm gọi tên bà từ ngoài khoảng sân tối. "
            "Đôi khi giọng nói ấy nghe giống hệt giọng ông Thomas khi còn trẻ; lúc khác, nó lại giống tiếng của người chị gái bà, "
            "dù người chị đó đang ở cách xa nhiều giờ lái xe.\n\n"
            "Bà Evelyn ban đầu cố tự trấn an rằng đó chỉ là tiếng gió lùa qua vách đá hay ảo giác của tuổi già. "
            "Nhưng những hiện tượng này xuất hiện ngày một dày đặc hơn. "
            "Một buổi chiều chạng vạng, khi nhìn qua cửa sổ bếp ra rặng đồi cát, bà nhìn thấy một bóng người cao lớn đứng bất động cách nhà vài chục mét. "
            "Trong ánh sáng lờ mờ của buổi hoàng hôn, người đó chỉ là một hình bóng đen đặc, đứng thẳng tắp hướng mặt về phía ngôi nhà. "
            "Bà quan sát nó trong suốt gần ba mươi giây mà bóng người ấy không hề nhúc nhích dù chỉ một milimet. "
            "Khi bà quay đầu gọi chồng và nhìn lại, khoảng đất trống đã không còn một bóng người.\n\n"
            "Và điều khiến bà Evelyn kinh hãi nhất bắt đầu xảy ra vào khoảng thời gian này: "
            "ông Thomas bắt đầu mắc chứng mộng du. Ông từng có tiền sử mộng du thời thơ ấu, "
            "nhưng suốt hơn bốn mươi năm hôn nhân, bà chưa từng thấy hành vi này tái diễn. "
            "Giờ đây, thỉnh thoảng giữa đêm khuya, bà lại giật mình thức giấc và thấy chồng mình đang đứng sững giữa ngưỡng cửa phòng ngủ. "
            "Mắt ông nhắm nghiền, đầu hơi nghiêng sang một bên như thể đang chăm chú lắng nghe một tần số âm thanh vô hình nào đó. "
            "Ông không hề đáp lời khi được gọi, chỉ lẳng lặng xoay người, bước vài bước dọc hành lang rồi quay lại giường, "
            "hoàn toàn không nhớ gì vào sáng hôm sau.\n\n"
            "Khoảnh khắc tột cùng của nỗi ám ảnh xảy ra vào một đêm trăng khuyết đầu mùa thu. "
            "Bà Evelyn tỉnh giấc bởi tiếng bước chân chậm rãi nện trên lớp sỏi ngoài cửa sổ phòng ngủ. "
            "Tiếng sỏi lạo xạo di chuyển qua lại theo một nhịp điệu cực kỳ chuẩn xác, dừng lại ở mỗi đầu góc nhà rồi quay ngược lại. "
            "Nghĩ rằng có gia súc lạc vào sân, bà hé rèm nhìn ra ngoài. "
            "Dưới ánh trăng mờ, một bóng đen cao gầy đang đi đi lại lại trên bãi sỏi. "
            "Dáng đi của nó mang một sự tính toán kỳ dị, như thể đã tập dượt quãng đường này hàng nghìn lần.\n\n"
            "Bà Evelyn lạnh gáy, vội vàng quay sang lay chồng dậy để báo động. "
            "Nhưng chiếc giường bên cạnh hoàn toàn trống không. "
            "Kinh hoàng tột độ, bà nhìn qua cánh cửa phòng ngủ hé mở và phát hiện ông Thomas đang mộng du trong hành lang tối. "
            "Và tại khoảnh khắc đó, tim bà gần như ngừng đập: "
            "Mỗi bước chân của ông Thomas nện trên sàn gỗ trong nhà, mỗi cú dừng lại, mỗi nhịp nghiêng người sang trái rồi xoay gót — "
            "tất cả đều trùng khớp một cách hoàn hảo, từng phần mười giây một, với nhịp bước của bóng đen đang đi trên bãi sỏi ngoài sân. "
            "Hai chuyển động song song, một bên trong và một bên ngoài, hòa làm một trong sự im lặng ghê rợn.\n\n"
            "Bà Evelyn đứng chết lặng trong góc phòng, nhìn hai bóng hình đồng bộ ấy trong nhiều phút trước khi can đảm bước tới lay nhẹ chồng dậy. "
            "Sau sự việc đêm đó, bà suy sụp hoàn toàn và đổ bệnh. Con gái họ đã lập tức đưa cha mẹ về thành phố sinh sống. "
            "Viên cảnh sát Nez khi đến kiểm tra hiện trường chỉ tìm thấy những vết lõm kỳ lạ trên nền sỏi lỏng lẻo. "
            "Trong hồ sơ riêng, ông chỉ ghi lại một dòng ngắn ngủi: "
            "Có một thứ gì đó ngoài bóng tối đã đặt sự chú ý đặc biệt lên gia đình này, và nguyên nhân của nó vĩnh viễn là một ẩn số."
        ),
        'subtitles': [
            "Năm 1998, tại vùng đất Mexican Water thuộc Khu bảo tồn Navajo, cựu Cảnh sát Edward Nez kiểm tra phúc lợi của gia đình Yazzie.",
            "Đôi vợ chồng già Thomas và Evelyn liên tục nghe thấy tiếng gõ cửa sổ và tiếng thì thầm gọi tên từ ngoài sân vắng.",
            "Bà Evelyn từng nhìn thấy một bóng đen cao lớn đứng bất động hướng về phía nhà suốt nửa phút rồi biến mất bí ẩn.",
            "Cùng thời điểm đó, ông Thomas bắt đầu mộng du trở lại sau hơn bốn mươi năm bình yên.",
            "Nhiều đêm, ông đứng sững giữa cửa phòng ngủ, đầu nghiêng sang một bên như lắng nghe một tần số vô hình.",
            "Khoảnh khắc kinh hoàng xảy ra vào đêm trăng khuyết: Bà Evelyn nghe tiếng bước chân nện trên bãi sỏi ngoài cửa sổ.",
            "Dưới ánh trăng, một bóng đen cao gầy đang đi lại trên sỏi với nhịp điệu đều đặn kỳ quái.",
            "Quay sang đánh thức chồng, bà phát hiện giường trống và ông Thomas đang mộng du ngoài hành lang tối.",
            "Từng sải chân, nhịp dừng và góc nghiêng của người chồng hoàn toàn đồng bộ chính xác với bóng đen ngoài sân.",
            "Hai chuyển động bên trong và bên ngoài hòa làm một trong sự im lặng nghẹt thở.",
            "Bà Evelyn suy sụp và gia đình dọn đi ngay sau đó; hiện trường chỉ còn lại những vết lõm không thể giải thích trên nền sỏi."
        ]
    },
    {
        'id': 'scene4_snowplow_ridge',
        'title': 'Hồi 4: Ca Trực Xe Cào Tuyết Trên Đèo Monticello – 2014',
        'dateMarker': {'date': 'THÁNG 2 NĂM 2014', 'location': 'Đèo Monticello - Blanding, Utah'},
        'text': (
            "Tháng 2 năm 2014, một đợt bão tuyết dữ dội cấp độ cảnh báo đỏ tràn qua miền đông nam bang Utah. "
            "Tuyến đường đèo huyết mạch nối liền hai thị trấn Monticello và Blanding nằm trên độ cao hơn hai nghìn mét, "
            "hoàn toàn chìm trong màn sương mù băng giá và những cơn gió quất với vận tốc hơn bảy mươi cây số một giờ.\n\n"
            "Jacob Thorne, một công nhân bảo trì đường bộ 46 tuổi với hơn hai thập kỷ kinh nghiệm lái xe cào tuyết chuyên dụng, "
            "nhận ca trực đơn độc vào đêm hôm đó để giữ cho tuyến đường không bị chôn vùi hoàn toàn dưới lớp tuyết dày. "
            "Với Thorne, việc điều khiển cỗ máy ủi nặng hàng chục tấn giữa đêm bão không phải điều xa lạ. "
            "Thế nhưng đêm đó, ngay khi xe bắt đầu leo lên đoạn đèo dốc hiểm trở, ông đã cảm nhận được một bầu không khí nặng nề bất thường.\n\n"
            "Khoảng hơn chín giờ tối, khi xe đang di chuyển qua một khúc đường quanh co trống trải trên sườn núi, "
            "Thorne bất ngờ nhìn thấy một bóng người lờ mờ xuất hiện ở rìa xa của luồng đèn pha công suất cao. "
            "Cái bóng xuất hiện chớp nhoáng rồi tan biến vào màn tuyết xoáy. "
            "Thorne tự nhủ rằng đó chỉ là ảo ảnh thị giác do ánh đèn pha phản chiếu trên các hạt tuyết bay. "
            "Nhưng mười phút sau, hình bóng ấy lại xuất hiện một lần nữa.\n\n"
            "Lần này, nó di chuyển ngay giữa vạch kẻ phân làn của mặt đường — "
            "một bóng đen gầy guộc bước đi thong thả trong lớp mù trắng xóa, luôn duy trì một khoảng cách cố định "
            "khoảng ba mươi mét ngay phía trước lưỡi ủi khổng lồ. "
            "Mỗi khi cuồng phong thổi mạnh làm tầm nhìn giảm xuống số không, cái bóng biến mất; "
            "nhưng hễ gió vừa dịu lại, nó lại sừng sững ở đó, bước từng bước nhịp nhàng dẫn đường cho cỗ xe ủi nặng nề.\n\n"
            "Đúng lúc sự căng thẳng đang dâng cao trong buồng lái, hệ thống điện đàm trên xe bỗng rè lên một chuỗi âm thanh nhiễu sóng chói tai. "
            "Từ trong loa, một giọng nói vang lên, nghe giống hệt giọng của người đội trưởng giám sát ca trực tại trạm điều hành: "
            "'Jacob, có một chiếc xe bán tải gặp nạn bị lật ở khúc cua phía trước, hãy giảm tốc độ.' "
            "Thorne bấm nút trả lời và xác nhận chỉ thị, nhưng loa đài chỉ còn lại những tiếng xì xào vô nghĩa, không hề có thêm phản hồi nào khác. "
            "Cảm giác có điều gì đó sai lệch bắt đầu xâm chiếm tâm trí ông.\n\n"
            "Khi cỗ máy tiếp tục tiến lên, ánh đèn pha chiếu rọi xuống mặt đường vừa được phủ một lớp tuyết mỏng mới tinh. "
            "Tại đó, Thorne bàng hoàng nhìn thấy một hàng dấu chân người xuất hiện rõ mồn một ngay trước mũi xe. "
            "Điều bất thường là mỗi bước chân có hình dáng bàn chân trần, nhưng sải bước lại dài một cách phi lý — "
            "mỗi dấu chân cách nhau tới gần hai mét rưỡi, và vết lún sâu vào lớp băng tuyết cứng như thể người bước đi "
            "phải mang một trọng lượng cực kỳ khủng khiếp. "
            "Cứ mỗi khi lưỡi cào tuyết chuẩn bị nghiến qua, dấu chân lại hiện ra phía trước, rồi bị tuyết cuốn phăng đi vào khoảng tối phía sau gương chiếu hậu.\n\n"
            "Tình huống lên đến đỉnh điểm khi xe bắt đầu đổ dốc ở bờ bên kia của đỉnh đèo. "
            "Vừa ôm cua qua một khúc ngoặt khuất tầm nhìn, luồng đèn pha rọi thẳng vào một sinh thể đang đứng sững giữa lòng đường. "
            "Nó đứng đối diện trực tiếp với chiếc xe tải khổng lồ, hai vai hơi so lại, đầu cúi thấp, "
            "và đôi mắt rực lên hai đốm sáng lạnh lẽo dưới ánh đèn. "
            "Thorne đạp lút phanh khẩn cấp. Chiếc xe cào tuyết nặng nề trượt dài trên mặt băng, phát ra những tiếng nghiến ken két đinh tai nhức óc. "
            "Cỗ máy khổng lồ trượt đi hàng chục mét trước khi dừng khựng lại, chỉ cách vị trí sinh thể đứng chưa đầy ba mét. "
            "Nhưng khi xe vừa đứng yên, cái bóng trên đường đã biến mất không một dấu vết.\n\n"
            "Thorne ngồi chết lặng trong buồng lái nhiều giây, tim đập thình thịch trong lồng ngực. "
            "Lấy hết can đảm, ông bật đèn pin và mở cửa bước xuống mặt đường băng giá để kiểm tra xem có va phải ai không. "
            "Gió tuyết quất rát rạt vào mặt. Không có một bóng người nào xung quanh, hai bên vệ đường là bờ tuyết dốc đứng không hề có vết trèo lên. "
            "Thế nhưng khi rọi đèn xuống mũi xe, Thorne rụng rời tay chân: "
            "Ngay trước lưỡi ủi thép, một chuỗi dấu chân mới tinh in sâu trên nền tuyết — "
            "và hướng của các dấu chân này không hề chạy trốn, mà đi thẳng ngược từ giữa đường về phía buồng lái xe, "
            "dừng lại chính xác ở vị trí cách bậc lên xuống cửa xe của ông chỉ một bước chân!\n\n"
            "Sáng hôm sau khi về đến trạm, Thorne báo cáo lại sự việc và kiểm tra nhật ký liên lạc. "
            "Ban điều hành khẳng định đêm qua toàn bộ tuyến đèo đã bị phong tỏa hoàn toàn vì bão tuyết, "
            "và người đội trưởng giám sát không hề thực hiện bất kỳ cuộc gọi nào qua bộ đàm. "
            "Chiếc xe bị lật mà giọng nói trong điện đàm nhắc tới cũng không hề tồn tại. "
            "Jacob Thorne xin nghỉ phép ngay tuần sau đó và không bao giờ nhận thêm bất kỳ ca trực đêm nào trên đèo Monticello nữa."
        ),
        'subtitles': [
            "Tháng 2 năm 2014, bão tuyết dữ dội đổ bộ xuống tuyến đèo Monticello hiểm trở ở bang Utah.",
            "Tài xế 46 tuổi Jacob Thorne điều khiển xe cào tuyết hạng nặng đơn độc dọn đường trong cuồng phong lạnh giá.",
            "Khoảng chín giờ tối, ông phát hiện một bóng người mờ ảo liên tục đi bộ giữa vạch phân làn trước mũi xe.",
            "Bộ đàm vang lên giọng người giám sát báo có xe gặp nạn ở khúc cua phía trước rồi tắt ngấm trong tiếng rè.",
            "Trước ánh đèn pha, một chuỗi dấu chân trần dài kỳ lạ xuất hiện trên tuyết rồi bị lưỡi ủi nghiến qua.",
            "Mỗi dấu chân sải dài tới gần hai mét rưỡi và lún sâu vào băng tuyết cứng một cách phi tự nhiên.",
            "Vừa qua khúc cua khuất, bóng đen đứng sững giữa lòng đường đối diện trực tiếp đầu xe.",
            "Thorne đạp phanh khẩn cấp khiến cỗ xe trượt dài trên mặt băng; khi xe dừng lại, bóng đen đã biến mất.",
            "Bước xuống kiểm tra, Thorne kinh hãi phát hiện chuỗi dấu chân trên tuyết đi thẳng ngược về phía buồng lái.",
            "Sáng hôm sau, trạm điều hành xác nhận không hề có cuộc gọi bộ đàm nào và tuyến đèo đã bị đóng hoàn toàn."
        ]
    },
    {
        'id': 'scene5_millers_creek',
        'title': 'Hồi 5: Vụ Mất Tích Bên Dòng Suối Miller – 2015',
        'dateMarker': {'date': 'THÁNG 2 NĂM 2015', 'location': 'Suối Miller, Bắc New Mexico'},
        'text': (
            "Gần đúng một năm sau sự việc trên đèo Monticello, vào tháng 2 năm 2015, "
            "tại một vùng ngoại ô hẻo lánh phía bắc bang New Mexico, một sự việc tương tự nhưng mang tính chất đe dọa trực diện hơn "
            "đã xảy ra với một gia đình sinh sống gần khu vực suối Miller.\n\n"
            "Khu đất của gia đình nằm tiếp giáp với một dải rừng thông rậm rạp và một nhánh suối cạn chảy qua khe núi, "
            "nơi có một cụm nông trại cũ bỏ hoang từ nhiều thập kỷ trước nằm rải rác về phía hạ lưu. "
            "Gia đình có ba người con: cô chị cả Megan 19 tuổi, cậu con trai thứ Evan 13 tuổi, và cô bé út Hannah vừa tròn 9 tuổi.\n\n"
            "Vào một buổi chiều mùa đông lạnh buốt nhưng trời trong, các mảng tuyết cũ vẫn còn bám chặt dưới bóng râm của các gốc thông. "
            "Sau bữa cơm trưa, bé Hannah xin phép mẹ ra sân sau chơi gần bìa cây. "
            "Khu vực này vốn quen thuộc và các đứa trẻ chỉ được phép chơi trong tầm mắt của ngôi nhà. "
            "Thế nhưng khoảng một giờ sau, khi người mẹ bước ra hiên gọi con vào nhà, không gian hoàn toàn im ắng không một lời hồi đáp.\n\n"
            "Cuộc tìm kiếm quanh sân nhanh chóng biến thành nỗi hoảng loạn khi người cha phát hiện một hàng dấu chân nhỏ của Hannah "
            "bước đều đặn rời khỏi bậc thềm hiên nhà, tiến thẳng vào bóng tối âm u của rừng thông già và biến mất. "
            "Khi bóng chiều dần buông xuống và nhiệt độ bắt đầu hạ thấp dưới mức âm độ, nỗi lo về việc cô bé bị hạ thân nhiệt trở nên cấp bách. "
            "Chính quyền địa phương và hàng xóm nhanh chóng thành lập một đội tìm kiếm tình nguyện, "
            "tỏa ra các hướng gọi tên Hannah trong màn đêm đang ập xuống rất nhanh.\n\n"
            "Trong số những người tìm kiếm, cô chị gái Megan là người thông thuộc địa hình khu vực này nhất. "
            "Cô cầm đèn pin men theo con đường mòn nhỏ chạy dọc bờ suối Miller. "
            "Khi đi được khoảng gần một cây số, qua một khúc quanh rậm rạp gần ranh giới nông trại cũ, "
            "ánh đèn pin của Megan quét qua một căn nhà nông trại bằng gỗ đã bị bỏ hoang từ lâu — "
            "cửa sổ vỡ vụn, mái ngói sụp xệ và cánh cửa chính mục nát nằm lệch bản lề.\n\n"
            "Và chính tại khoảnh khắc đó, ở ngưỡng cửa căn nhà hoang, Megan nhìn thấy bóng dáng một đứa trẻ bước qua cánh cửa và đi vào bóng tối bên trong. "
            "Dáng vóc nhỏ nhắn, chiếc áo khoác màu đỏ và cử chỉ bước đi — Megan chắc chắn một trăm phần trăm đó chính là em gái Hannah của mình. "
            "Cô hét lớn tên em và lao thục mạng về phía căn nhà.\n\n"
            "Bước qua ngưỡng cửa, không khí bên trong lạnh buốt đến thấu xương, đặc quánh mùi gỗ mục và ẩm mốc lâu năm. "
            "Ánh đèn pin yếu ớt của cô quét qua từng căn phòng trống trơn, sàn gỗ mục kẽo kẹt dưới chân. "
            "Không hề có bóng dáng ai. Căn nhà hoàn toàn trống rỗng, không có lấy một món đồ đạc nào để một đứa trẻ có thể ẩn nấp. "
            "Sự im lặng bao trùm lấy không gian ngột ngạt đến mức Megan có thể nghe rõ cả tiếng tim mình đang đập dồn dập.\n\n"
            "Cảm thấy rợn người và không tìm thấy em gái, Megan quyết định quay trở ra hành lang chính để chạy về phía đội tìm kiếm. "
            "Thế nhưng, ngay khi vừa bước ra ngã rẽ hành lang dẫn về phía cửa chính, "
            "một bàn tay bất ngờ chạm nhẹ lên vai cô. "
            "Cú chạm cực kỳ nhẹ nhàng, tự nhiên và bình thản, như cái vỗ vai thân mật của một người quen muốn thu hút sự chú ý mà không làm người khác giật mình. "
            "Sau này, Megan chia sẻ rằng chính sự bình thản như một con người ấy mới là điều khiến cô ám ảnh nhất trong suốt cuộc đời.\n\n"
            "Theo phản xạ tự nhiên, Megan giật mình quay phắt người lại, quét luồng sáng đèn pin dọc theo chiều dài hành lang tối om. "
            "Và ở phía cuối hành lang, một bóng đen cao lớn đang đứng sừng sững tựa lưng vào khung cửa phòng trong. "
            "Chiều cao của nó vượt xa bất kỳ người bình thường nào, hai bờ vai hẹp và đôi cánh tay khẳng khiu buông dài sát đất. "
            "Luồng đèn pin quét thẳng vào gương mặt nó, bắt gặp một đôi mắt phát ra thứ ánh sáng phản quang lạnh ngắt, "
            "vô cảm và chăm chú nhìn thẳng vào mắt Megan. "
            "Sinh thể không hề gầm rú, không tấn công, nó chỉ đứng im bất động quan sát cô trong bóng tối. "
            "Megan hét lên thất thanh, vấp ngã rồi bật dậy tháo chạy thục mạng ra khỏi căn nhà, lao về phía ánh đèn của đội tìm kiếm.\n\n"
            "Nhiều giờ sau đó, vào nửa đêm, bé Hannah cuối cùng cũng được một nhóm tìm kiếm khác phát hiện "
            "khi đang lang thang gần một khúc suối đóng băng cách căn nhà hoang hơn hai cây số. "
            "Cô bé run rẩy vì lạnh nhưng may mắn không bị thương tích nghiêm trọng. "
            "Khi được các nhân viên y tế và cha mẹ hỏi vì sao lại một mình đi sâu vào rừng trong đêm lạnh như vậy, "
            "câu trả lời ngây thơ của Hannah đã khiến tất cả những người có mặt chết lặng: "
            "Cô bé khẳng định chắc nịch rằng mình nghe thấy tiếng người anh trai Evan gọi tên mình từ trong rừng thông, "
            "nói rằng anh bị ngã đau chân và xin em vào giúp đỡ. "
            "Hannah đã lần theo giọng nói quen thuộc đó cho đến khi bị lạc hoàn toàn.\n\n"
            "Thế nhưng, sự thật là cậu bé Evan suốt cả buổi chiều và đêm hôm đó chưa từng bước chân ra khỏi tầm mắt của cha mẹ "
            "và luôn đi sát bên đội tìm kiếm người lớn. "
            "Căn nhà nông trại ven suối Miller đã bị gia đình thuê máy ủi san phẳng thành bình địa vào mùa hè năm đó. "
            "Cả Megan và Hannah cho đến tận ngày hôm nay đều từ chối nhắc lại chi tiết về đêm hôm ấy, "
            "ngoại trừ một sự thật không thể chối cãi: có một thực thể đã sử dụng chính giọng nói của những người ruột thịt "
            "để săn lùng những đứa trẻ trong gia đình họ."
        ),
        'subtitles': [
            "Tháng 2 năm 2015, tại vùng suối Miller ở phía bắc New Mexico, bé gái Hannah chín tuổi bất ngờ mất tích sau bữa trưa.",
            "Dấu chân nhỏ của cô bé dẫn thẳng từ hiên nhà rồi biến mất vào khoảng tối của rừng thông già.",
            "Khi nhiệt độ hạ xuống dưới mức âm độ, gia đình và đội tình nguyện khẩn cấp tỏa ra tìm kiếm trong màn đêm.",
            "Người chị gái 19 tuổi Megan men theo bờ suối và nhìn thấy bóng em gái bước vào một căn nhà nông trại bỏ hoang.",
            "Megan lao vào trong nhưng các căn phòng trống trơn mục nát, hoàn toàn không có dấu vết của Hannah.",
            "Khi quay ra hành lang chính, một bàn tay nhẹ nhàng, tự nhiên như của người quen bất ngờ chạm lên vai cô.",
            "Quay đèn pin lại, ở cuối hành lang tối là một sinh thể cao lêu nghêu với đôi cánh tay dài khẳng khiu và đôi mắt phản quang lạnh lẽo.",
            "Nó đứng bất động nhìn trừng trừng vào Megan; cô hoảng loạn tháo chạy thục mạng ra ngoài rừng.",
            "Nửa đêm, Hannah được tìm thấy bên bờ suối đóng băng và kể lại em đi theo tiếng anh trai Evan kêu cứu trong rừng.",
            "Nhưng cậu bé Evan suốt buổi chiều luôn đi cạnh cha mẹ và chưa từng rời khỏi đội tìm kiếm.",
            "Căn nhà hoang bị san phẳng sau đó, để lại nỗi ám ảnh kinh hoàng về một thực thể biết mượn giọng nói người thân để săn mồi."
        ]
    },
    {
        'id': 'scene6_epilogue',
        'title': 'Hồi 6: Dư Âm Bất Định & Những Câu Hỏi Chưa Có Lời Đáp',
        'dateMarker': {'date': 'HỒ SƠ TỔNG HỢP', 'location': 'Những câu hỏi chưa có lời đáp'},
        'text': (
            "Bốn câu chuyện, xảy ra tại bốn địa điểm khác nhau, liên quan đến những con người không hề có mối liên hệ nào trong cuộc sống. "
            "Thế nhưng khi đặt các lời khai cạnh nhau, chúng ta không khỏi rùng mình trước một sự nhất quán đến kỳ lạ.\n\n"
            "Thứ nhất là khả năng bắt chước âm thanh đạt đến mức độ tinh vi phi thường. "
            "Nó không chỉ nhại lại tiếng sủa của một con chó hay tiếng thì thầm gọi tên thông thường, "
            "mà nắm bắt chính xác ngữ điệu, âm sắc và cảm xúc của những người thân thiết nhất — "
            "từ giọng của người vợ, người chị gái, người anh trai cho đến giọng chỉ huy của cấp trên qua sóng bộ đàm. "
            "Đó là một hành vi mang tính toán tâm lý rõ rệt: đánh trúng vào lòng trắc ẩn, sự tin tưởng và phản xạ bảo vệ người thân "
            "nhằm dụ dỗ con mồi bước ra khỏi vùng sáng bảo vệ của ngôi nhà.\n\n"
            "Thứ hai là việc tôn trọng những rào cản vật lý và sự kiên nhẫn rình rập. "
            "Trong hầu hết các trường hợp, thực thể này hiếm khi tấn công vũ lực một cách thô bạo. "
            "Nó luôn đứng bên ngoài ranh giới: sau tấm kính cửa sổ phủ sương, bên kia kính chắn gió của xe tải, "
            "ở cuối hành lang tối hay lấp ló nơi bìa rừng thông. "
            "Nó quan sát, thử thách phản ứng tâm lý và gieo rắc sự hoang mang tột độ trước khi hành động.\n\n"
            "Thứ ba là những dấu vết vật lý để lại trên hiện trường luôn mang tính bất khả thi: "
            "những sải bước dài hơn hai mét rưỡi lún sâu trên tuyết cứng, những bước chân trần đi ngược chiều về phía buồng lái, "
            "hay những vệt lõm phẳng lì không có lối ra vào. "
            "Và rợn người hơn cả là hiện tượng xâm nhập tâm lý — như khoảnh khắc người chồng mộng du bước đi đồng bộ từng nhịp "
            "với bóng đen ngoài sân sỏi ở Mexican Water.\n\n"
            "Tất nhiên, từ góc nhìn khoa học duy lý, người ta có thể tìm cách giải thích những sự việc này thông qua "
            "hiện tượng ảo giác do sự cô lập cùng cực của mùa đông gây ra, "
            "hiện tượng phản xạ âm thanh kỳ lạ của gió bão trong các hẻm vực sa thạch, "
            "hay sự suy diễn của não bộ khi đối mặt với bóng tối mênh mông. "
            "Thế nhưng, những lời giải thích thuần túy lý thuyết ấy dường như chưa bao giờ xoa dịu được nỗi ám ảnh có thật "
            "của những nhân chứng đã từng một lần đối mặt.\n\n"
            "Có lẽ điều đáng sợ nhất không phải là việc chúng ta có chứng minh được sự tồn tại của yee naaldlooshii hay không. "
            "Mà điều đáng sợ nằm ở nhận thức rằng: giữa thế giới văn minh hiện đại này, "
            "vẫn còn những vùng đất hoang vu nơi bóng tối lưu giữ những quy luật cổ xưa mà con người chưa từng thấu hiểu. "
            "Và khi đêm đông buông xuống trên những cánh rừng thông miền Tây Nam, "
            "nếu bạn vô tình nghe thấy một giọng nói thân quen đang gọi tên mình từ khoảng tối ngoài hiên vắng... "
            "hãy nhớ rằng: đừng bao giờ bước chân ra khỏi vùng sáng."
        ),
        'subtitles': [
            "Bốn hồ sơ tại các vùng đất khác nhau để lại sự nhất quán dị thường đến lạnh sống lưng.",
            "Khả năng bắt chước âm thanh tinh vi: Nhại chính xác giọng vợ, anh trai hay tiếng chỉ huy qua bộ đàm.",
            "Một hành vi mang tính toán tâm lý: Đánh vào lòng trắc ẩn để dụ con mồi rời khỏi vùng sáng an toàn.",
            "Sự tôn trọng rào cản vật lý: Luôn kiên nhẫn rình rập sau cửa kính, bóng cây hay cuối hành lang tối.",
            "Dấu vết vật lý phi lý: Sải bước dài hơn hai mét rưỡi trên tuyết cứng và những bước chân đi ngược chiều.",
            "Hiện tượng xâm nhập tâm lý rợn người như bước chân mộng du đồng bộ hoàn hảo ở Mexican Water.",
            "Dù khoa học cố giải thích bằng ảo giác mùa đông hay âm học phản xạ, nỗi sợ của nhân chứng là có thật.",
            "Bóng tối vùng Tây Nam vẫn lưu giữ những quy luật cổ xưa mà con người hiện đại chưa từng thấu hiểu.",
            "Và nếu một đêm đông nghe thấy giọng người thân gọi tên từ rừng sâu, đừng bao giờ bước ra khỏi vùng sáng."
        ]
    }
]

manifest = []
for sc in full_scenes:
    audio_path = os.path.join(audio_dir, f"{sc['id']}_vo.mp3")
    print(f"Generating full TTS for {sc['id']}...")
    tts = gTTS(sc['text'], lang='vi')
    tts.save(audio_path)
    
    # Check duration with ffmpeg
    ff_cmd = [ffmpeg_bin, '-i', audio_path]
    ff_res = subprocess.run(ff_cmd, capture_output=True, text=True)
    dur_sec = 0.0
    for line in ff_res.stderr.splitlines():
        if 'Duration:' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip().split(':')
            dur_sec = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
            break
            
    buffer_frames = 90 # 3 seconds breathing room
    audio_frames = int(round(dur_sec * 30))
    total_frames = audio_frames + buffer_frames
    print(f"  -> {sc['id']}: {dur_sec:.2f}s (~{dur_sec/60:.2f} min) -> {total_frames} frames")
    
    manifest.append({
        'id': sc['id'],
        'title': sc['title'],
        'dateMarker': sc['dateMarker'],
        'audioPath': f"episodes/skinwalker/audio/{sc['id']}_vo.mp3",
        'audioDurationSec': dur_sec,
        'audioFrames': audio_frames,
        'durationInFrames': total_frames,
        'subtitlesText': sc['subtitles'],
        'fullText': sc['text']
    })

with open('/home/anhnt/Documents/Remotion/public/episodes/skinwalker/full_manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

total_sec = sum(m['audioDurationSec'] for m in manifest)
print(f"\nALL 6 FULL EPISODE VOICEOVERS GENERATED!")
print(f"Total duration: {total_sec:.2f}s (~{total_sec/60:.2f} minutes)!")
