DROP PROCEDURE IF EXISTS getEvntMstr;
DELIMITER //
-- ********************************************************************************************
-- getEvntMstr イベントマスタを取得する
--
-- 【処理概要】
--  イベントマスタを取得する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _evnt_cd     : イベントコード
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
CREATE PROCEDURE `getEvntMstr`(
    IN `_evnt_cd` CHAR(4)
    , OUT `exit_cd` INTEGER
)
COMMENT 'イベントマスタ取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        SELECT
            EVNT_CD
            ,SPNSR
            ,DATE_FORMAT(EVNT_DATE, '%Y%m%d') as EVNT_DATE
        FROM
            T_EVNT_DT_MSTR
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
