DROP PROCEDURE IF EXISTS updateSttsCd;
DELIMITER //
-- ********************************************************************************************
-- updateSttsCd ステータスコードを更新する
--
-- 【処理概要】
--  ステータスコードを更新する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      なし
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.7.23 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `updateSttsCd`(
    OUT `exit_cd` INTEGER
)
COMMENT 'ステータスコード更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
      UPDATE
          T_CNTNT
      SET
          STTS_CD = (
              case
                  when TIMESTAMPDIFF(MINUTE,NOW(3),GTHR_TM) < 0 AND TIMESTAMPDIFF(MINUTE,NOW(3),STT_TM) > 0 AND STTS_CD = '0' then '1'
                  when TIMESTAMPDIFF(MINUTE,NOW(3),STT_TM) < 10 AND TIMESTAMPDIFF(MINUTE,NOW(3),STT_TM) > 0 AND STTS_CD = '0' then '1'
                  when TIMESTAMPDIFF(MINUTE,NOW(3),STT_TM) < 0 AND STTS_CD IN('0','1') then '2'
                  when TIMESTAMPDIFF(MINUTE,NOW(3),STT_TM) < 0 AND STTS_CD = '3' then '4'
                  when TIMESTAMPDIFF(MINUTE,NOW(3),END_TM) < 0 AND STTS_CD IN ('5','6') then '7'
                  else STTS_CD
              end
          )
        ;
    ");

    SET @query_text = @query;

        -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
