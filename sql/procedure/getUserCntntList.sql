DROP PROCEDURE IF EXISTS getUserCntntList;
DELIMITER //
-- ********************************************************************************************
-- getUserCntntList 参加者演目取得
--
-- 【処理概要】
--  参加者演目取得
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _jnnr_cd : 参加者コード
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.8.30 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `getUserCntntList`(
    IN `_jnnr_cd` CHAR(4)
    ,OUT `exit_cd` INTEGER
)
COMMENT '参加者演目取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
      SELECT
        TCJ.JNNR_CD AS JNNR_CD
        ,TCJ.CNTNT_CD AS CNTNT_CD
        ,TC.TTL AS TTL
        ,DATE_FORMAT(TC.STT_TM, '%H:%i') as STT_HM
        ,DATE_FORMAT(TC.END_TM, '%H:%i') as END_HM
        ,DATE_FORMAT(TC.GTHR_TM, '%H:%i') as GTHR_HM
      FROM
        T_CNTNT_JNNR TCJ
    LEFT OUTER JOIN T_CNTNT TC
        ON TCJ.CNTNT_CD = TC.CNTNT_CD
    WHERE
        TCJ.JNNR_CD = '0190'
    ORDER BY
        STT_TM ASC
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
