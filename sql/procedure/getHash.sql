DROP PROCEDURE IF EXISTS getHash;
DELIMITER //
-- ********************************************************************************************
-- getHash ハッシュコード取得
--
-- 【処理概要】
--  ハッシュコードを取得する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _twitter_id     : TwitterID
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
CREATE PROCEDURE `getHash`(
    IN `_twitter_id` CHAR(10)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ハッシュコード取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        SELECT
            CB.STFF_CD as STFF_CD
            ,TJ.JNNR_NM as JNNR_NM
            ,TJ.TWITTER_ID as TWITTER_ID
            ,CB.HSH as HSH
        FROM
            C_BLNGS CB
        left outer join T_JNNR TJ
            ON CB.STFF_CD = TJ.JNNR_CD
        WHERE TJ.TWITTER_ID LIKE '",_twitter_id,"%'
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
