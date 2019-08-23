DROP PROCEDURE IF EXISTS advanceCntnt;
DELIMITER //
-- ********************************************************************************************
-- advanceCntnt 企画時間を前倒しする
--
-- 【処理概要】
--  企画時間を前倒しする
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _cntnt_cd : コンテンツコード
--      _time : 前倒しする時間
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.8.23 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `advanceCntnt`(
    IN `_cntnt_cd` CHAR(4)
    ,IN `_time` VARCHAR(20)
    ,OUT `exit_cd` INTEGER
)
COMMENT '企画時間前倒し'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
      UPDATE
          T_CNTNT
      SET
          STT_TM = SUBTIME(STT_TM, '",_time,"')
          ,END_TM = SUBTIME(END_TM, '",_time,"')
          ,GTHR_TM = (CASE
              WHEN GTHR_TM IS NULL THEN GTHR_TM
              WHEN GTHR_TM = 0 THEN GTHR_TM
              ELSE SUBTIME(GTHR_TM, '",_time,"')
           END)
        WHERE
            STT_TM >= (
              SELECT DISTINCT
                  TGT_TM
              FROM
                  (
                    SELECT
                        STT_TM as TGT_TM
                    FROM
                        T_CNTNT
                    WHERE
                        CNTNT_CD = '",_cntnt_cd,"'
                  ) as temp
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
